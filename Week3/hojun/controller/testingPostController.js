const testingPostModel = require('../models/testingPostModel')

module.exports = {
    controller: async (req, res) => {
        res.send(await testingPostModel.model(req.body.seed))
    }
}