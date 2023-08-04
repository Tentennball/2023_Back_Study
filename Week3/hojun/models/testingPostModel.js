const db = require('./index');
const sequelize = db.sequelize;

const randomSentence = require('random-sentence');

const Posts = require('../model/Post')

const showTables = async (check) => {
    await sequelize.query('show tables').then(rows => {
        for (let row of rows) {
            for (let col of row) {
                if (col.Tables_in_database_development === check) return true
            }
        }
        return false;
    });
}

module.exports = {
    model: async (seed) => {
        const Post = await Posts();
        await Post.sync()

        if (showTables('users')) {
            const User = await require('../model/User')();
            await User.sync()

            await User.hasMany(Post, { foreignKey: 'userId' })
            await Post.belongsTo(User, { foreignKey: 'userId' })

            const posts = await Post.findAll();

            if (posts.length === 0) {
                let datas = [];
                const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                for (let i = 0; i < seed; i++) {
                    datas.push({
                        title: randomSentence({ word: Math.floor(Math.random() * 10 + 1) }),
                        content: randomSentence({ min: 20, max: 100 }) + randomSentence({ min: 20, max: 100 }),
                        date: date,
                        userId: Math.floor(Math.random() * 100 + 1),
                        views: Math.floor(Math.random() * seed),
                        like_count: Math.floor(Math.random() * seed),
                        createdAt: date,
                        updatedAt: date
                    })
                }

                for (let i = 0; i < 100; i++) await Post.create(datas[Math.floor(Math.random() * datas.length)])
                return (JSON.stringify(await Post.findAll(), null, 2))
            }
            else return (JSON.stringify(posts, null, 2))
        }
        else return "There're no users in DB"
    }
}