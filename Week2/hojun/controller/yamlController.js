const cvt = require("../model/yamlToJson");

module.exports = {
  sendYaml: async (req, res) => {
    const path = req.body.path + ".yaml";
    cvt.convertor(path).then((data) => {
      const message = {
        status: "ok",
        body: data
      }
      res.send(message)
    });
  },
};
