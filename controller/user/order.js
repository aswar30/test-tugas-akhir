const {Pesanan, Blok, Lahan_Makam, Data_Jenazah, Kacamatan, Kelurahan} = require('../../models')
const Snap = require('../../helper/midtrans')

class OrderControllers {
    static async viewOrderHistory(req, res) {
        try {
            const {id: userId} = req.session.user
            const orderHistory = await Pesanan.findAll({
                where: {
                    masyarakat_id: userId,
                },
                include: [
                    {
                        model: Blok
                    },
                    {
                        model: Lahan_Makam
                    }
                ]
            })
            const listOderHistory = orderHistory
            return res.render('user/orderHistory', {
                listOderHistory,
                title: 'Riwayat Pemesanan',
                menuActive: 'orderHistory'
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
        return res.render('user/detailOrders', {
          order,
          title: 'Detail Pesanan',
          menuActive: 'orderHistory'})
      } catch (error) {
        console.log(error)
        res.redirect('/login')
      }
    }

    static async Notifications (req, res ) {
    try {
      let dataTransaction = await Snap.transaction.notification(req.body)
      if(dataTransaction) {
        const orderId = await Pesanan.findOne({
          where : {
            order_id_midtrans: dataTransaction.order_id
          }
        }) 
        if(orderId) {
          if(dataTransaction.transaction_status == 'settlement') {
            await Pesanan.update({
            status: "Menunggu Validasi",
            Pembayaran: `${dataTransaction.payment_type}`
          },
          {where : {
            order_id_midtrans : dataTransaction.order_id
          }
        })
      }  else if (dataTransaction.transaction_status == 'cancel' 
          || dataTransaction.transaction_status == 'expire') {
            await Pesanan.update({
            status: "batal",
            Pembayaran: `${dataTransaction.payment_type}`
          },
          {
            where : {
              order_id_midtrans : dataTransaction.order_id
            }
          })
          await Lahan_Makam.update({
            status: 'kosong'
          },
          {
            where: {
              id: orderId.lahan_makam_id
            }
          })
        }
      }
      return res.status(200).json({
        message : 'success'
      })
    }
    } catch (err) {
      console.log(err)
      return res.status(200).json({
        message: "INTERNAL SERVER ERROR",
      })
    }
  }
}

module.exports = OrderControllers