const {Lahan_Makam, Blok} = require('../../models')
const { Op } = require("sequelize")

class LahanMakamController {
    static async viewLahanMakam(req, res) {
        try {
            let lahanMakam
            if(req.query.search && req.query.blok){
                lahanMakam =  await Lahan_Makam.findAll({
                    where: {
                        [Op.and]: [{
                            Nomor: {
                                [Op.substring]: req.body.search
                            }
                        }, 
                        { 
                            blok_id: req.body.blok
                        }
                    ]
                },
                include: [
                    {model: Blok}
                ]})}
            else if(req.query.search){
                lahanMakam = await Lahan_Makam.findAll({
                    where: {
                        status: 'kosong',
                        Nomor: {
                            [Op.substring]: req.query.search
                        }
                    },
                    include: [
                    {model: Blok},
            ]})

            }
            else if(req.body.blok){
                lahanMakam = await Lahan_Makam.findAll({
                    where: {
                        blok_id: req.body.blok
                    }
                })
            }
            else lahanMakam = await Lahan_Makam.findAll({
                where: {status: 'kosong'},
                include: [
                    {model: Blok},
            ]})
            const block = lahanMakam
            res.render('user/burialGrounds', {
                lahanMakam,
                block,
                title: 'Lahan Pemakaman',
                menuActive: 'grounds'
            })
        } catch (error) {
            console.log(error)
            res.redirect('/dasboard')
        }
    }
}

module.exports = LahanMakamController