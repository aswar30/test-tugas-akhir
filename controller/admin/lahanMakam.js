const {Lahan_Makam, Blok} = require('../../models')
const { Op } = require("sequelize")
const {saveSingleImage} = require('../../helper/firebase')

class LahanMakamController {
    static async viewLahanMakam(req, res) {
        try {
            let lahanMakam
            if(req.session.user == null | req.session.user == undefined) return res.redirect('/login')
            if(req.body.search && req.body.blok) lahanMakam =  await Lahan_Makam.findAll({where: {[Op.and]: [{Nomor: {[Op.substring]: req.body.search}}, { blok_id: req.body.blok}]}})
            if(req.body.search) lahanMakam = await Lahan_Makam.findAll({where: {Nomor: {[Op.substring]: req.body.search}}})
            if(req.body.blok) lahanMakam = await Lahan_Makam.findAll({where: {blok_id: req.body.blok}})
            else lahanMakam = await Lahan_Makam.findAll()
            const blok = await Blok.findAll()
            res.render('admin/readBurialGrounds', {
                lahanMakam,
                blok
            })
        } catch (error) {
            res.redirect('/lahan-makam')
        }
    }
    static async viewCreate(req, res) {
        try {
            if(req.session.user == null | req.session.user == undefined) return res.redirect('/login')
            const block = await Blok.findAll()
            return res.render('admin/addBurialGrounds', {
                block
            })
        } catch (error) {
            res.redirect('/lahan-makam')
        }
    }
    static async actionCreate(req, res) {
        try {
            const {number, price, blockId} = req.body
            const urlImage = await saveSingleImage(req.file)
            console.log(urlImage)
            await Lahan_Makam.create({
                Nomor: number,
                harga: price,
                gambar:urlImage,
                blok_id: blockId
            })
            return res.redirect('/admin/lahan-makam')
        } catch (error) {
            console.log(error)
            res.redirect('/admin/add-lahan-makam')
        }
    }
    static async viewUpdate(req, res) {
    }
    static async viewDelete(req, res) {  
    }

}

module.exports = LahanMakamController