const xmlToJson = require("xml-js");
const fs = require("fs");

module.exports = {
  convertor: async (path) => {
    const xml = await fs.readFileSync(
      __dirname.substring(0, __dirname.length - 6) + path,
      "utf-8"
    );
    return await xmlToJson.xml2json(xml);
  },
};
