const dbConfig = require("../config/db.config.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.post = require("./post.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

db.user.hasMany(db.post);
db.post.hasMany(db.comment);
db.post.belongsTo(db.user);
db.comment.belongsTo(db.post);
db.comment.belongsTo(db.user);

module.exports = db;
