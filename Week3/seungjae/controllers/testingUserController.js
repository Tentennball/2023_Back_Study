const faker = require("faker");
const TestingUser = require("../models/testingUserModel");

// 테스트 사용자 추가 컨트롤러
async function addTestingUsers(req, res) {
  try {
    faker.seed(req.body.seed);

    const testingUsers = [];
    for (let i = 1; i <= 100; i++) {
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      testingUsers.push(user);
    }

    await TestingUser.bulkCreate(testingUsers);

    return res
      .status(201)
      .json({ message: `성공적으로 ${req.body.seed} 명의 테스트 사용자를 추가했습니다.` });
  } catch (error) {
    console.error("테스트 사용자 추가 오류:", error);
    return res
      .status(500)
      .json({ error: "테스트 사용자 추가에 실패했습니다." });
  }
}

module.exports = { addTestingUsers };