const {faker} = require('@faker-js/faker');

const makeFakeUserInfo = (seed,length) => {
    
    faker.seed(seed);
    const userInfo = Array.from({length:length},()=>{
        return {
            email:faker.internet.email(),
            password:faker.internet.password()
        }
    });
    
    return userInfo;
}

module.exports = makeFakeUserInfo;