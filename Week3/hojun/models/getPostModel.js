const db = require('./index');
const sequelize = db.sequelize;
const { Op } = db.Sequelize;

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
        const text = head.text;

        if (showTables('users') && showTables('posts')) {
            const Post = await Posts();
            await Post.sync();

            switch (type) {
                case 'title':
                    const title = await Post.findAll({
                        where: {
                            title: { [Op.substring]: text }
                        }
                    })
                    return title;
                case 'content':
                    const content = await Post.findAll({
                        where: {
                            content: { [Op.substring]: text }
                        }
                    })
                    return content;
                case 'writer':
                    const writer = await Post.findAll({
                        where: {
                            userId: { [Op.eq]: text }
                        }
                    })
                    return writer;
                default:
                    break;
            }
        }
        else return "There're no users or posts in DB"
    }
}