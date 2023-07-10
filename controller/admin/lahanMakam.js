const {Lahan_Makam, Blok} = require('../../models')
const { Op } = require("sequelize")
const {saveSingleImage} = require('../../helper/firebase')

class LahanMakamController {
    static async viewLahanMakam(req, res) {
        try {
            let lahanMakam
            let {blockId, search} = req.query
            if(search && blockId){
                lahanMakam =  await Lahan_Makam.findAll({
                    where: {
                        [Op.and]: [{
                            Nomor: {
                                [Op.substring]: search
                            }
                        }, 
                        { 
                            blok_id: blockId
                        }
                    ]
                },
                include: [
                    {model: Blok}
                ]})}
            else if(search){
                lahanMakam = await Lahan_Makam.findAll({
                    where: {
                        Nomor: {
                            [Op.substring]: search
                        }
                    },
                    include: [
                    {model: Blok},
            ]})

            }
            else if(blockId){
                lahanMakam = await Lahan_Makam.findAll({
                    where: {
                        blok_id: blockId
                    },
                    include: [
                    {model: Blok}
                    ]
                })
            }
            else lahanMakam = await Lahan_Makam.findAll({
                include: [
                    {model: Blok},
            ]})
            const blok = await Blok.findAll()
            res.render('admin/readBurialGrounds', {
                lahanMakam,
                blok,
                path: "/admin/lahan-makam"
            })
        } catch (error) {
            console.log(error)
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
            res.redirect('/admin/lahan-makam')
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
    static async actionDelete(req, res) { 
        try {
            const {groudsId} = req.params
            console.log(groudsId)
            await Lahan_Makam.destroy({where: {id: groudsId, status: {[Op.ne]: 'terisi'}}})
            res.redirect('/admin/lahan-makam')
        } catch(error) {
            console.log(error)
        }
    }

}

module.exports = LahanMakamController