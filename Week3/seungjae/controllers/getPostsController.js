const TestingPost = require("../models/testingPostModel");

async function getPostList(req, res) {
    try {
      const type = req.query.type;
      const count = parseInt(req.query.count);
  
      let posts;
      if (type === "most") {
        posts = await TestingPost.findAll({
          order: [["views", "DESC"]],
          limit: count,
        });
      } else if (type === "recent") {
        posts = await TestingPost.findAll({
          order: [["date", "DESC"]],
          limit: count,
        });
      } else {
        return res.status(400).json({ error: "잘못된 type 파라미터입니다." });
      }
  
      return res.status(200).json({ posts });
    } catch (error) {
      console.error("게시물을 가져오는 중 오류 발생:", error);
      return res.status(500).json({ error: "게시물을 가져오는데 실패했습니다." });
    }
  }


  module.exports = { getPostList };