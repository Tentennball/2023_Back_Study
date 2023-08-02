const express = require("express");
const app = express.Router();

const testingUserController = require('../controller/testingUserController')
const testingPostController = require('../controller/testingPostController')
const listController = require('../controller/listController')
const searchController = require('../controller/searchController')

app.post('/v1/testing/testingUser', testingUserController.controller)
app.post('/v1/testing/testingPost', testingPostController.controller)
app.get('/v1/post/list', listController.controller)
app.get('/v1/post/search', searchController.controller)

module.exports = app;