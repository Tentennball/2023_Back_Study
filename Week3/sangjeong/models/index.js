const Sequelize = require('sequelize');
const Session = require('./Session');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

require('dotenv').config();
const config = JSON.parse(process.env.DATABASE_ACCOUNT);
const db = {};

const sequelize = new Sequelize(config.database, config.user, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Session = Session;
db.Post = Post;
db.Comment = Comment;

User.init(sequelize);
Session.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Session.associate(db);
Post.associate(db);
Comment.associate(db);


module.exports = db;