const csvToJson = require("csvtojson");

module.exports = {
  convertor: async (path) => {
    return await csvToJson().fromFile(
      __dirname.substring(0, __dirname.length - 6) + path
    );
  },
};
