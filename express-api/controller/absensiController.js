const { Model } = require('sequelize')
const AbsensiModel = require('../models/absensiModel')

module.exports.absensiGet = async (req, res) => {
    try{
        const absensi = await AbsensiModel.findAll()
        res.json({
            succes: true,
            message: "getting absensi data",
            absensi,
            metadata: "test absensi endpoint"
        })
    }catch (e){
        res.json({
            error: "data invalid"
        })
        console.log(e)
    }
}

module.exports.absensiCheckin = async (req, res) => {
    const { users_id } = req.body                                   // inputan client
    
    try{
        // const findById = await AbsensiModel.findAll({where: {users_id: users_id}})           catatan pengingat: bisa mendapat 2 respon di 1 method (post and get)
        const absensi = await AbsensiModel.create({                 // backend (database)
            users_id, status: 'in'
        })
        res.json({
            message: "checkin berhasil",
            absensi,
            metadata: "test absensi post"
        })
    }catch (e) {
        res.json({
            error: "data invalid"
        })
        console.log(e)
    }
}

module.exports.absensiCheckout = async (req, res) => {
    const { users_id } = req.body                                   // inputan client

    try{
        const absensi = await AbsensiModel.create({                 // backend (database)
            users_id, status: 'out'
        })
        res.json({
            succes: true,
            message: "checkout berhasil",
            absensi,
            metadata: "test absensi post"
        })
    }catch (e){
        res.json({
            error: "data invalid"
        })
        console.log(e)
    }
}