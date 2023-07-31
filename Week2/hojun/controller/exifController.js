const cvt = require('../model/exifToJson');

module.exports = {
  sendExif: async (req, res) => {
    const path = req.body.path;
    cvt.convertor(path).then(data => {
      const message = {
        status: "ok",
        body: data
      }
      res.send(message)
    });
  },
};
