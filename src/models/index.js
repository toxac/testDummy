const mongoose = require('mongoose');
const dbConfig = require("../config/db.config");

mongoose.promise = global.promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

db.ideas = require("./ideas.model")(mongoose);

module.exports = db;