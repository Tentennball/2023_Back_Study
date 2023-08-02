const getPostModel = require('../models/getPostModel')

module.exports = {
    controller: async (req, res) => {
        res.send(await getPostModel.model(req.headers))
    }
}