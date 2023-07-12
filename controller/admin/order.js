const {
    Pesanan, 
    Blok, 
    Lahan_Makam, 
    Data_Jenazah, 
    Kacamatan,Kelurahan
} = require('../../models')
const { Op } = require("sequelize")
class OrderController {
    static async viewOderHistory (req, res) {
        try {
            let listOrder
            const {status, search, blockId} = req.query
            console.log(req.query)
            if(search && status && blockId){
                listOrder =  await Pesanan.findAll({
                    where: {
                        [Op.and]: [{
                            Nomor: {
                                [Op.substring]: search
                            }
                        },
                        { status: status },
                        { blok_id: blockId }
                    ]
                },
                include: [
                    {model: Blok},
                    {model: Lahan_Makam}
                ]})
            }
            else if(search && status ){
                 listOrder =  await Pesanan.findAll({
                    where: {
                        [Op.and]: [{
                            Nomor: {
                                [Op.substring]: search
                            }
                        },
                        { status: status },
                    ]
                },
                include: [
                    {model: Blok},
                    {model: Lahan_Makam}
                ]})
            }
            else if(search && blockId){
                listOrder =  await Pesanan.findAll({
                    where: {
                        [Op.and]: [
                            {
                            Nomor: { [Op.substring]: search}
                        },
                        { blok_id: blockId }
                    ]
                },
                include: [
                    {model: Blok},
                    {model: Lahan_Makam}
                ]
            })
            }
            else if(blockId && status ){
                 listOrder =  await Pesanan.findAll({
                    where: {
                        status: status,
                        blok_id: blockId
                    },
                    include: [
                        {model: Blok},
                        {model: Lahan_Makam}
                    ]
                })
            }
            else if(search){
                listOrder =  await Pesanan.findAll({
                    where: {
                        [Op.and]: [
                            {
                            Nomor: { [Op.substring]: search}
                        },
                    ]
                },
                include: [
                    {model: Blok},
                    {model: Lahan_Makam}
                ]
            })
            }
            else if(blockId){
                listOrder =  await Pesanan.findAll({
                    where: {
                        blok_id: blockId
                    },
                    include: [
                        {model: Blok},
                        {model: Lahan_Makam}
                    ]
                })
            }
            else if(status){
                listOrder =  await Pesanan.findAll({
                    where: {
                       status: status
                    },
                    include: [
                        {model: Blok},
                        {model: Lahan_Makam}
                    ]
                })
            }
            else {
                listOrder = await Pesanan.findAll({
                include: [
                    {model: Blok},
                    {model: Lahan_Makam}
                ]
            })
        }
        const blok = await Blok.findAll()
        res.render('admin/orderList', {
            listOrder,
            blok,
            path: "/admin/list-order",
            title: 'Daftar Pesanan',
            menuActive: 'listOrder'
        })
        } catch (error) {
            console.log(error)
        }
    }

    static async viewDetailOrder(req, res) {
      try {
        const {orderId} = req.params
        const order = await Pesanan.findOne({
          where: {id: orderId},
          include: [
            {model: Blok},
            {model: Lahan_Makam},
            {model: Data_Jenazah,
            include: [
             { model: Kacamatan},
             {model: Kelurahan}
            ]}
          ]
        })
        return res.render('admin/detailOrder', {
          order,
          title: 'Detail Pesanan',
          menuActive: null
        })
      } catch (error) {
        console.log(error)
      }
    }

    static async confirmOrder(req, res) {
        try{
            const {orderId} = req.params
            await Pesanan.update({status: 'Diterima'}, {
                where: {
                    id: orderId
                }
            })
            res.redirect('/admin/list-order')
        }catch (error) {
            console.log(error)
        }
    }
}

module.exports = OrderController