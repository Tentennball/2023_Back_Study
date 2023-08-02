const db = require('./index');
const sequelize = db.sequelize;

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
    model: async (head) => {
        const type = head.type;
        const count = head.count;

        if (showTables('users') && showTables('posts')) {
            const Post = await Posts();
            await Post.sync();

            switch (type) {
                case 'most':
                    const most = await Post.findAll({
                        order: [
                            ['views', 'DESC']
                        ]
                    })
                    return most.slice(0, count);
                case 'recent':
                    const recent = await Post.findAll({
                        order: [
                            ['createdAt', 'DESC']
                        ]
                    })
                    return recent.slice(0, count);
                default:
                    break;
            }
        }
        else return "There're no users or posts in DB"
    }
}