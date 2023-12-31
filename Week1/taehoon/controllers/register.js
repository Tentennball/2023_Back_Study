const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.register = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const hashedpw = bcrypt.hashSync(password, 12);
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            try {
                await User.create({ email: email, password: hashedpw });
                res.status(200).json({ message: 'Register Complete!' });
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            };
        }
        else {
            const error = new Error('already exist');
            error.statusCode = 422;
            throw error;
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};