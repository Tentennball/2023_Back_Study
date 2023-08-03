const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            id:{
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            password:{
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
                onUpdate: Sequelize.NOW,
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db){
        db.User.hasMany(db.Comment, {foreignKey: 'user_id', sourceKey: "id"});
    }
};

module.exports = User;