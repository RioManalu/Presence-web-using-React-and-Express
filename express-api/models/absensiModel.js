const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/dbConfig')

class Absensi extends Model { }

Absensi.init({
    users_id: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.ENUM('in', 'out')
    }
}, {
    sequelize,
    modelName: 'Absensi'
})

module.exports = Absensi
