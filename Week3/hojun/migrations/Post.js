const db = require('../models/index');
const sequelize = db.sequelize;
const { DataTypes } = db.Sequelize;

module.exports = async () => {
    const Post = await sequelize.define('Posts', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        date: DataTypes.DATE,
        userId: DataTypes.INTEGER,
        views: DataTypes.INTEGER,
        like_count: DataTypes.INTEGER
    })

    return Post;
}