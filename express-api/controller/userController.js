const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')
const passwordCheck = require('../utils/passwordCheck')
const handleErrors = require('../utils/handleErrors')

module.exports.userRegister = async (req, res) => {
    const { username, password } = req.body                                 // inputan client
    try {
        const users = await UserModel.create({                              // backend (database)
            username,
            password: password
        })
        res.json({
            message: "posting users data",
            registered: users,
            metadata: "test users post"
        })
    } catch (err){
        const errors = handleErrors(err)
        res.json({errors})
    }
}

module.exports.userLogin = async (req, res) => {
    const { username, password } = req.body
    try {
        const check = await passwordCheck(username, password)               // try checking-nya untuk memvalidasi inputan user dan menghindari error yang mengakibatkan server mati
        if(check.compare){
            res.json({
                message: "login success",
                users : check.userData,
                metadata: "user logged in"
            })
        }
    } catch (err){
        const errors = handleErrors(err)
        res.json({errors})
    }
}

module.exports.userGet = async (req, res) => {
    try{
        const users = await UserModel.findAll()
        res.json({
            message: "getting users data",
            users,
            metadata: "test users endpoint"
        })
    }catch (err){
        const errors = handleErrors(err)
        res.json({errors})
    }
}

module.exports.userChangePassword = async (req, res) => {
    const {id, username, password, passwordBaru } = req.body               // inputan client
    
    try{
        const check = await passwordCheck(username, password)
        const encryptedPassword = await bcrypt.hash(passwordBaru, 10)
    
        if(check.compare){
            const users = await UserModel.update({
                username, password : encryptedPassword
            }, { where: {
                id: id}})
            
            res.json({
                message: "change username and password",
                users: { updated: users[0] },
                metadata: "User Updated"
            })
        }
    } catch (err){
        const errors = handleErrors(err)
        res.json({errors})
    }
}