const faker = require("faker");
const _ = require("lodash");
const sequelize = require("../database");
const TestingUser = require("../models/testingUserModel");
const TestingPost = require("../models/testingPostModel");

async function addTestingPosts(req, res) {
  try {
    faker.seed(req.body.seed);

    const randomUsers = await TestingUser.findAll({
      order: sequelize.random(), // 랜덤 순서로 정렬
      limit: req.body.seed, // 요청한 수만큼의 랜덤 사용자를 가져옴
    });

    const shuffledUserIds = _.shuffle(
      randomUsers.map((user) => user.dataValues.userId)
    );

    const testingPosts = [];
    for (let i = 0; i < 100; i++) {
      const post = {
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        userId: shuffledUserIds[i % req.body.seed],
        date: faker.date.past(),
        views: faker.datatype.number({ min: 1, max: 10000 }),
        like_count: faker.datatype.number({ min: 1, max: 10000 }),
      };
      testingPosts.push(post);
    }

    await TestingPost.bulkCreate(testingPosts);

    return res
      .status(201)
      .json({ message: "성공적으로 100 명의 테스트 사용자를 추가했습니다." });
  } catch (error) {
    console.error("테스트 포스트 추가 오류:", error);
    return res
      .status(500)
      .json({ error: "테스트 포스트 추가에 실패했습니다." });
  }
}

module.exports = { addTestingPosts };
