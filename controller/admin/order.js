const {
    Pesanan, 
    Blok, 
    Lahan_Makam, 
    Data_Jenazah, 
    Kacamatan,
    Kelurahan,
    Masyarakat,
} = require('../../models')
const { Op, where } = require("sequelize")
class OrderController {
    static async viewOderHistory (req, res) {
        try {
            let listOrder
            const {status, search, blockId} = req.query
            if(search && status && blockId){
                listOrder =  await Pesanan.findAll({
                    where: {
                        [Op.and]: [{
                            nomor_pesanan: {
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
                            nomor_pesanan: {
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
                            nomor_pesanan: { [Op.substring]: search}
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
                            nomor_pesanan: { [Op.substring]: search}
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
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message: alertMessage, status: alertStatus }
        res.render('admin/orderList', {
            listOrder,
            blok,
            alert,
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
            {model: Masyarakat},
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
            await Pesanan.update({status: 'Menunggu Pembayaran'}, {
                where: {
                    id: orderId
                }
            })
            req.flash('alertMessage', 'Pesanan Sudah di Terima')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/list-order')
        }catch (error) {
            console.log(error)
        }
    }

    static async rejectOrder(req, res) {
        try{
            const {orderId} = req.params
            const Order = await Pesanan.findOne({where: {id: orderId}})
            await Pesanan.update({status: 'Ditolak'}, {
                where: {
                    id: orderId
                }
            })
            await Lahan_Makam.update({status: 'kosong'},{
                where: {
                    id: Order.lahan_makam_id
                }
            })
            req.flash('alertMessage', 'Pesanan di tolak')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/list-order')
        }catch (error) {
            console.log(error)
        }
    }
}

module.exports = OrderController