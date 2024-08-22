const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('testdb', 'root', 'D@tabase010', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize