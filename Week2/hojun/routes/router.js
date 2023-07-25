const express = require("express");
const app = express.Router();

const csvController = require("../controller/csvController");
const jsonComtroller = require("../controller/jsonController");
const xmlController = require("../controller/xmlController");
const yamlController = require("../controller/yamlController");
const exifController = require("../controller/exifController");

app.post("/v1/files/csv", csvController.sendCsv);
app.post("/v1/files/json", jsonComtroller.sendJson);
app.post("/v1/files/xml", xmlController.sendXml);
app.post("/v1/files/yaml", yamlController.sendYaml);
app.post("/v1/files/exif", exifController.sendExif);

module.exports = app;