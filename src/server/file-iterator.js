

const path = require('path');
const fs = require("fs");
const _ = require("underscore");

module.exports = function (folders, config) {
    const result = {pathes: [], infos: {}};
    config.visited = {};
    folders.forEach((src) => {
        if(fs.existsSync(src)){
            const stat = fs.statSync(src);
            if (stat.isFile()) {
                throw "only source folder path";
            } else {
                iterate(src, config, result, 0);
            }
        }else{
            console.error(`[file-iterator] ${src} does not exist! Please check you path-config and user-config.js`);
            console.error(`[file-iterator] ${src} 不存在! 检查一下你的path-config和user-config.js`);
        }
    });
    delete config.visited;
    return result;
};

function isLegalDepth(depth, config) {
    if (_.has(config, "depth")) {
        return depth <= config.depth;
    }
    return true;
}

function getStat(p){
    const stat = fs.statSync(p);
    const result = {};
    result.isFile = stat.isFile();
    result.isDir = stat.isDirectory();
    result.mtimeMs = stat.mtimeMs;
    result.mtime = stat.mtime;
    result.size = stat.size;
    return result;
}

function iterate (p, config, result, depth) {
    if(config.visited[p]){
        return;
    }
    try {
        const stat = getStat(p, config);
        if (stat.isFile) {
            if (config && config.filter && !config.filter(p, stat)) {
                return;
            }

            if(config && config.doLog &&  result.pathes.length % 2000 === 0){
                console.log("[file-iterator] scan:", result.pathes.length);
            }
            result.infos[p] = stat;
            result.pathes.push(p);
        } else if (stat.isDir && isLegalDepth(depth + 1, config)) {
            fs.readdirSync(p).forEach((e) => {
                e = path.join(p, e);
                iterate(e, config, result, depth + 1);
            });
        }
    } catch (e) {
        console.error("[file-iterator]",e);
    } finally{
        config.visited[p] = true;
    }
}
