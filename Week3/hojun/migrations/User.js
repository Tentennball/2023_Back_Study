const db = require('../models/index');
const sequelize = db.sequelize;
const { DataTypes } = db.Sequelize;

module.exports = async () => {
    const User = await sequelize.define('Users', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        timestamps: false
    });

    return User
}