const getPostsModel = require('../models/getPostsModel')

module.exports = {
    controller: async (req, res) => {
        res.send(await getPostsModel.model(req.headers))
    }
}