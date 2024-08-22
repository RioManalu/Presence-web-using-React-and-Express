const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/dbConfig')
const bcrypt = require('bcrypt')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
            len: {
                args: [4, 20],
                msg: "username must be around 4 to 20 characters"
            },
            notContains: {
                args: ["&", "=", "+", "'", `"`, ",", "<", ">", ".", "*", "%", "$", "#", "@", "!", "^", "`", "|", "(", ")"],
                msg: "contains prohibited words"
            },
            notEmpty: {
                args: true,
                msg: "please enter your username"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 20],
                msg: "password must be around 4 to 20 characters"
            },
            notEmpty: {
                args: true,
                msg: "please enter your password"
            }
        }
    }
}, {
    hooks: {
        beforeCreate: async (user, options) => {
            const hashedPassword = await bcrypt.hash(user.password, 10)
            user.password = hashedPassword;
        }
    },
    sequelize,
    modelName: 'User'
})
// cuman sekali digunakan, kalo mau ngerubah model
// sequelize.sync({ alter: true });

module.exports = User




// ===================== connect langsung ke db 

// const mysql = require("mysql2")


// const database = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "D@tabase010",
//     database: "film_users",
// });

// database.connect((err) => {
//     if (err) throw err;
//     console.log("Database connected");
// });

// module.exports = database