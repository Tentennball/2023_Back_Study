const { Op } = require("sequelize");
const TestingPost = require("../models/testingPostModel");

async function searchPosts(req, res) {
    try {
      const { type, text } = req.query;
      let whereCondition = {};
      switch (type) {
        case "title":
          whereCondition = {
            title: {
              [Op.like]: `%${text}%`,
            },
          };
          break;
        case "content":
          whereCondition = {
            content: {
              [Op.like]: `%${text}%`,
            },
          };
          break;
        case "writer":
          whereCondition = {
            postId: text,
          };
          break;
        default:
          return res.status(400).json({ error: "Invalid type" });
      }
  
      const posts = await TestingPost.findAll({
        where: whereCondition,
      });

      return res.json(posts);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
      return res.status(500).json({ error: "게시물 검색에 실패했습니다." });
    }
  }


  module.exports = { searchPosts };