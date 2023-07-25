const yamlToJson = require("js-yaml");
const fs = require("fs");

module.exports = {
  convertor: async (path) => {
    const yaml = await fs.readFileSync(
      __dirname.substring(0, __dirname.length - 6) + path,
      "utf-8"
    );
    return await yamlToJson.load(yaml);
  },
};
