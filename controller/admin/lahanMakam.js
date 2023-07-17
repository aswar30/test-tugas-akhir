const {Lahan_Makam, Blok} = require('../../models')
const { Op } = require("sequelize")
const {saveSingleImage, deleteImage} = require('../../helper/firebase')
const {validatefileSingle} = require('../../middlewere/validateSize')
const {validateNumberBurialGround, validateUpdateBurialGround} = require('../../validation/inDatabaseAdmin')

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
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/readBurialGrounds', {
                alert,
                lahanMakam,
                blok,
                menuActive: 'grounds',
                path: '/admin/lahan-makam',
                title: 'Lahan Makam'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            console.log(error)
            res.redirect('/lahan-makam')
        }
    }
    static async viewCreate(req, res) {
        try {
            const block = await Blok.findAll()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            return res.render('admin/addBurialGrounds', {
                alert,
                block,
                menuActive: 'grounds',
                title: 'Tambah Lahan Makam',
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/lahan-makam')
        }
    }
    static async actionCreate(req, res) {
        try {
            const {number, price, blockId} = req.body
            validatefileSingle(req.file)
            await validateNumberBurialGround(number, blockId)
            const urlImage = await saveSingleImage(req.file)
            await Lahan_Makam.create({
                Nomor: number,
                harga: price,
                gambar:urlImage,
                blok_id: blockId
            })
            req.flash('alertMessage', 'Berhasil Membuat Lahan Makam Baru')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/lahan-makam')
        } catch (error) {
            console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/add-lahan-makam')
        }
    }
    static async viewUpdate(req, res) {
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
             const {groundId} = req.params
             const block = await Blok.findAll()
             const ground = await Lahan_Makam.findOne({
                where: {id: groundId},
            include: [
                {model: Blok}
            ]})
             res.render('admin/updateBurialGrounds', {
                alert,
                ground,
                block,
                menuActive: 'grounds',
                title: 'Perbarui Lahan Makam',
             })
        } catch (error) {
             console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/lahan-makam')
        }
    }
    static async actionUpdate(req, res) {
        const {groundId} = req.params
        try {
            const {number, price, blockId} = req.body
            await validateUpdateBurialGround(number, blockId, groundId)
            const image = req.file
            const {gambar} = await Lahan_Makam.findOne({where: {id: groundId}})
            let payload 
            if(!image) {
                payload = {
                    Nomor: number,
                    harga: price,
                    blok_id: blockId
                }
            }else {
                if(gambar) await deleteImage(gambar)
                const urlImage = await saveSingleImage(req.file)
                payload = {
                    Nomor: number,
                    harga: price,
                    blok_id: blockId,
                    gambar :urlImage,
                }
            }
            await Lahan_Makam.update(payload, {
                where: {
                    id: groundId
                }
            })
            req.flash('alertMessage', 'Berhasil Memperbarui Lahan Makam Baru')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/lahan-makam')
        } catch (error) {
            console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            return res.redirect(`/admin/update-lahan-makam/${groundId}`)
        }
    }

    static async actionDelete(req, res) { 
        try {
            const {groudsId} = req.params
            const {gambar} = await Lahan_Makam.findOne({where: {id: groudsId}})
            await Lahan_Makam.destroy({where: {id: groudsId, status: {[Op.ne]: 'terisi'}}})
            await deleteImage(gambar)
            req.flash('alertMessage', 'Berhasil Hapus Lahan Makam')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/lahan-makam')
        } catch(error) {
            console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/lahan-makam')
        }
    }

}

module.exports = LahanMakamController