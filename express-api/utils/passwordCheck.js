const bcrypt = require("bcrypt")
const UserModel = require("../models/userModel")

const passwordCheck = async (username, password) => {
    const userData = await UserModel.findOne({ where: { username: username } })
    const compare = await bcrypt.compare(password, userData.password)

    return {compare, userData}
}

module.exports = passwordCheck