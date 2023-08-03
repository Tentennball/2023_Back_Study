const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            comment_id:{
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            content:{
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            author: {
                type: Sequelize.STRING(40),
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
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db){
        db.Comment.belongsTo(db.Post, {foreignKey: 'post_id', targetKey: "post_id"});
    }
};

module.exports = Comment;