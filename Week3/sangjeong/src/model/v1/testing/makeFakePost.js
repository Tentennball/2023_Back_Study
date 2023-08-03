const {faker} = require('@faker-js/faker');

const makeFakePost = (seed,length,users) => {
    
    const usersLength = users.length-1;

    faker.seed(seed);
    const userInfo = Array.from({length:length},()=>{
        const rdn = faker.number.int({min: 0, max: usersLength});
        return {
            title: faker.word.words({ count: { min: 1, max: 5 } }),
            content: faker.word.words({ count: { min: 1, max: 100 } }),
            like_count: faker.number.int({min: 0, max: 65535}),
            views : faker.number.int({min: 0, max: 65535}),
            user_id: users[rdn].dataValues.id,
        }
    });
    
    return userInfo;
}

module.exports = makeFakePost;