const cvt = require("../model/xmlToJson");

module.exports = {
  sendXml: async (req, res) => {
    const path = req.body.path + ".xml";
    cvt.convertor(path).then((data) => {
      const message = {
        status: "ok",
        body: JSON.parse(data)
      }
      res.send(message)
    });
  },
};
