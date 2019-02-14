const Sequelize = require('sequelize');

const User = {
    username: Sequelize.STRING,
    password: Sequelize.STRING
}

module.exports = User;