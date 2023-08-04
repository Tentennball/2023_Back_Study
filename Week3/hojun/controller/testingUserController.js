const testingUserModel = require('../models/testingUserModel')

module.exports = {
    controller: async (req, res) => {
        res.send(await testingUserModel.model(req.body.seed))
    }
}