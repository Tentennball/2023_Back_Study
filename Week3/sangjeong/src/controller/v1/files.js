// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;
const PUBLIC_FILE_PATH = PATH + '/src/public';

//view
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const files = require(PATH + '/src/model/v1/files');

router.get('/', (req, res, next)=>{
    next();
});

router.post('/:form', async(req, res)=>{
    try{
        const form = req.params.form;
        const path = PUBLIC_FILE_PATH + req.body.path.replace(/\\/g,'/') + "." + form;
        
        const [data, status] = files.readFile(path);
        switch (status){
            case "completed":
                switch(form){
                    case 'xml':
                        const [xmlData, xmlStatus] = await files.xmlToJson(data);
                        if(xmlStatus === "error") throw xmlData;
                        res.send (xmlData);
                        break;
                    case 'json':
                        res.send(JSON.parse(data));
                        break;
                    case 'csv':
                        const [csvData, csvStatus] = await files.csvToJson(data);
                        if(csvStatus === "error") throw csvData;
                        res.send (csvData);
                        break;
                    case 'yaml':
                        const [yamlData, yamlStatus] = files.csvToJson(data);
                        if(yamlStatus === "error") throw yamlData;
                        res.send (yamlData);
                        break;
                    default:
                        throw "not found";
                }
                break;
            case "failed":
                res.send(data);
                break;
            default:
                throw data;
        }
    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    }
});

router.post('/exif', (req, res)=>{
    const path = PUBLIC_FILE_PATH + req.body.path.replace(/\\/g,'/');

    files.getMetadata(path,(error, metadata)=>{
        if(error) {
            console.log(error);
            res.sendFile(ERROR_PAGE);
        }

        const obj = {
            make:metadata.image.Make,
            latitude:metadata.gps.GPSLatitude[0],
            longitude:metadata.gps.GPSLongitude[0]
        }

        res.send(obj);
    });

    // const form = path.slice(path.lastIndexOf('.'));

    // files.readFile(path, async(error, data)=>{
    //     try{
    //         if(error) throw error;
    //         const getMetadata = (data) => {
    //             files.getMetadata(data,(error, metadata) => {
    //                 if(error) {
    //                     console.log(error);
    //                     res.sendFile(ERROR_PAGE);
    //                 }
    //                 res.send(metadata);
    //             })
    //         }
    //         switch(form){
    //             case "HEIC":
    //             case "heic":
    //                 const [newData, status] = files.heicConvert(data);
    //                 if(status==="error") throw newData;
    //                 getMetadata(newData);
    //                 break;
    //             default:
    //                 getMetadata(data)
    //         }
    //     }catch(error){
    //         console.log(error);
    //         res.sendFile(ERROR_PAGE);
    //     }
    // })

});

module.exports = router;