const express = require("express");
const router = express.Router();
const testingPostController = require("../controllers/testingPostController");
const getPostController = require("../controllers/getPostController");
const getPostsController = require("../controllers/getPostsController");

router.post("/v1/testing/testingPost", testingPostController.addTestingPosts);
router.get("/v1/post/list", getPostsController.getPostList);
router.get("/v1/post/search", getPostController.searchPosts);


module.exports = router;