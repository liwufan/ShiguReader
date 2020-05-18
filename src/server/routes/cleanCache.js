
const express = require('express');
const router = express.Router();
const serverUtil = require("../serverUtil");
const db = require("../models/db");
const { getAllFilePathes } = db;;
const path = require('path');
const getCacheOutputPath = db.getCacheOutputPath;
const cachePath = serverUtil.common.cachePath;

function doCacheClean(config){
    const cleanCache = require("../../tools/cleanCache");
    try{
        cleanCache.cleanCache(cachePath, config);
    }catch(e){
        console.error(e);
    }
}

router.post('/api/cleanCache', (req, res) => {
    const minized = req.body && req.body.minized;

    const allowFileNames =  getAllFilePathes().map(filePath => {
        let outputPath = getCacheOutputPath(cachePath, filePath);
        outputPath = path.basename(outputPath);
        return outputPath;
    })

    function afterClean() {
        res.sendStatus(200);
    }

    doCacheClean({minized: minized, allowFileNames: allowFileNames, afterClean: afterClean});
});

module.exports = router;
