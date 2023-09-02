const {Lahan_Makam, Blok, Total_lahan_makam} = require('../../models')
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
            const {total}= await Total_lahan_makam.findOne({where: {id : 1}})
            console.log(total)
            let isLogin = true
            if(req.session.user == null | req.session.user == undefined) isLogin = false
            res.render('user/burialGrounds', {
                lahanMakam,
                block,
                isLogin: isLogin,
                title: 'Lahan Pemakaman',
                menuActive: 'grounds',
                totalLahan: total,

            })
        } catch (error) {
            console.log(error)
            res.redirect('/dasboard')
        }
    }
}

module.exports = LahanMakamController