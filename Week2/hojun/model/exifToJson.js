const fs = require('fs');

module.exports = {
  convertor: async (path) => {
    path = __dirname.substring(0, __dirname.length - 6) + path;
    return await fs.statSync(path);
  },
};
