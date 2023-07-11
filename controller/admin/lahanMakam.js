const {Lahan_Makam, Blok} = require('../../models')
const { Op } = require("sequelize")
const {saveSingleImage, deleteImage} = require('../../helper/firebase')
const {validatefileSingle} = require('../../middlewere/validateSize')

class LahanMakamController {
    static async viewLahanMakam(req, res) {
        try {
            let lahanMakam
            let {blockId, search} = req.query
            if(search && blockId){
                listOrder =  await Lahan_Makam.findAll({
                    where: {
                        [Op.and]: [{
                            nomor_pesanan: {
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
            validatefileSingle(req.file)
            const urlImage = await saveSingleImage(req.file)
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
        try {
            const {groudId} = req.params
            const {number, price, blockId} = req.body
            const image = req.file
            const {gambar} = await Lahan_Makam.findOne({where: {id: groudId}})
            let payload 

            if(!image) {
                payload = {
                    Nomor: number,
                    harga: price,
                    blok_id: blockId
                }
            } else {
                await deleteImage(gambar)
                payload = {
                    Nomor: number,
                    harga: price,
                    blok_id: blockId,
                    gambar :urlImage,
                }
            }
            await Lahan_Makam.update(payload, {
                where: {
                    id: groudId
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async actionDelete(req, res) { 
        try {
            const {groudsId} = req.params
            const {gambar} = await Lahan_Makam.findOne({where: {id: groudsId}})
            await Lahan_Makam.destroy({where: {id: groudsId, status: {[Op.ne]: 'terisi'}}})
            await deleteImage(gambar)
            res.redirect('/admin/lahan-makam')
        } catch(error) {
            console.log(error)
            res.redirect('/admin/lahan-makam')
        }
    }

}

module.exports = LahanMakamController