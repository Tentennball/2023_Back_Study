const cvt = require("../model/csvToJson");

module.exports = {
  sendCsv: async (req, res) => {
    const path = req.body.path + ".csv";
    cvt.convertor(path).then((data) => {
      const message = {
        status: "ok",
        body: data
      }
      res.send(message)
    });
  },
};
