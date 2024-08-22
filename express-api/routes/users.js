const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')



// menggunakan orm yang sudah di-modelkan

router.get('/', userController.userGet)
router.post('/register', userController.userRegister)
router.put('/', userController.userChangePassword)
router.post('/login', userController.userLogin)

module.exports = router




// menggunakan query langsung

// database.query("SELECT * FROM users", (err, rows) => {
//     if (err) throw err;
//     res.status(200).json({
//         succes: true,
//         message: "getting users data",
//         data: rows,
//     })
// })
