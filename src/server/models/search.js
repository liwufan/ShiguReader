
const serverUtil = require("../serverUtil");
const db = require("../models/db");
const { getAllFilePathes } = db;;
const parse = serverUtil.parse;
const nameParser = require('../../name-parser');
const includesWithoutCase =  nameParser.includesWithoutCase;
const zipInfoDb = require("../models/zipInfoDb");
const { getZipInfo }  = zipInfoDb;
const util = global.requireUtil();
const path = require('path');


function isEqual(s1, s2){
    return s1 && s2 && s1.toLowerCase() === s2.toLowerCase();
}

function isSimilar(s1, s2){
    const MIN_AUTHOR_TEXT_LENGTH = 3;
    if(s1 && s2 && s2 > MIN_AUTHOR_TEXT_LENGTH){
        return s1.toLowerCase().includes(s2.toLowerCase()) && Math.abs(s1.length - s2.length) < 2;
    }

    return false;
}

function searchByTagAndAuthor(tag, author, text, onlyNeedFew) {
    // let beg = (new Date).getTime()
    const files = [];
    const fileInfos = {};
    let _break;
    let textInLowCase = text && text.toLowerCase();

    getAllFilePathes().forEach(filePath => {
        if(_break || !util.isDisplayableInExplorer(filePath)){
            return;
        }

        const info = db.getFileToInfo(filePath);
        const result = (author || tag) && parse(filePath);
        //sometimes there are mulitple authors for one book
        let canAdd = false;

        if(result){
            if (author &&  (isEqual(result.author, author) || isEqual(result.group, author) || isSimilar(result.author, author))) {
                canAdd = true;
            } else if(author && includesWithoutCase(result.authors, author)){
                canAdd = true;
            }else  if (result && tag && includesWithoutCase(result.tags, tag)) {
                canAdd = true;
            } 
        }

        if(!canAdd){
            //pick part of filePath to search
            let matchPath = filePath.toLowerCase();
            const parent = path.basename(path.dirname(matchPath));
            matchPath = path.join(parent, path.basename(matchPath));

            if (textInLowCase && matchPath.includes(textInLowCase)) {
                canAdd = true;
            }
        }

        if(canAdd){
            files.push(filePath);
            fileInfos[filePath] = info;
        }

        if (onlyNeedFew && files.length > 5) {
            _break = true;
        }
    });
   
    // let end = (new Date).getTime();
    // console.log((end - beg)/1000, "to search");
    const getThumbnails = serverUtil.common.getThumbnails;
    return { files, tag, author, fileInfos, thumbnails: getThumbnails(files), zipInfo: getZipInfo(files) };
}

module.exports = searchByTagAndAuthor;
