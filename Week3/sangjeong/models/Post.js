const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            post_id:{
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content:{
                type: Sequelize.TEXT,
                allowNull: false,
            },
            views: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            like_count: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
                onUpdate: Sequelize.NOW,
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db){
        db.Post.belongsTo(db.User, {foreignKey: 'user_id', targetKey: "id"});
        db.Post.hasMany(db.Comment, {foreignKey: 'post_id', sourceKey: "post_id"});
    }
};

module.exports = Post;