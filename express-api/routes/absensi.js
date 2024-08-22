const express = require("express")
const router = express.Router()
const absensiController = require('../controller/absensiController')

// menggunakan orm yang sudah di-modelkan

router.get('/', absensiController.absensiGet)
router.post('/checkin', absensiController.absensiCheckin)
router.post('/checkout', absensiController.absensiCheckout)

module.exports = router