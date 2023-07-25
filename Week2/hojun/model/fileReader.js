const fs = require("fs");

module.exports = {
  fileReader: async (path) => {
    return await fs.readFileSync(
      __dirname.substring(0, __dirname.length - 6) + path,
      "utf-8"
    );
  },
};
