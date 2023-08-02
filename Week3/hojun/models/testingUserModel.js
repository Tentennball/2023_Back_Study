const Users = require('../model/User')

const randomEmail = require('random-email');
const randomDomains = require('random-domains');

const generatePassword = () => {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i)
        retVal += charset.charAt(Math.floor(Math.random() * n));
    return retVal;
}

module.exports = {
    model: async (seed) => {
        const User = await Users();
        await User.sync()
        const users = await User.findAll();

        if (users.length === 0) {
            let datas = [];
            for (let i = 0; i < seed; i++) {
                datas.push({
                    email: randomEmail({ domain: randomDomains({ tld: 'com' }) }),
                    password: generatePassword(),
                })
            }

            for (let i = 0; i < 100; i++) await User.create(datas[Math.floor(Math.random() * datas.length)])
            return (JSON.stringify(await User.findAll(), null, 2))
        }
        else return (JSON.stringify(users, null, 2))
    }
}