const fr = require("../model/fileReader");

module.exports = {
  sendJson: async (req, res) => {
    const path = req.body.path + ".json";
    fr.fileReader(path).then((data) => {
      const message = {
        status: "ok",
        body: data
      }
      res.send(message)
    });
  },
};
