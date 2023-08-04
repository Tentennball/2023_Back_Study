const Sequelize = require('sequelize');

class Session extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            session_id:{
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: true,
            },
            expires: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
                unique: false
            },
            data:{
                type: Sequelize.STRING(500),
                allowNull: false,
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Session',
            tableName: 'sessions',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db){}
};

module.exports = Session;