const {Pesanan, Blok, Lahan_Makam} = require('../../models')

class PaymentControllers {
    static async viewPayment(req, res) {
        try {
            const {idOrder} = req.params
            const {id: userId} = req.session.user
            const order = await Pesanan.findOne({where : {id: idOrder, masyarakat_id: userId}}) 
            return res.render('user/payments', {
            totalPaymnets: order.jumlah_pembayaran,
            urlMidtrans: order.url_midtrans,
            isLogin: true,
            title: 'Pembayaran',
            menuActive: 'payments'
        })
        } catch (error) {
            return res.redirect('/dasboard')
        }
    }

    static async viewListPaymnet(req, res) {
        try {
            const {id: userId} = req.session.user
            const order = await Pesanan.findAll({
                where: {
                    masyarakat_id: userId,
                    status: 'Menunggu Pembayaran'
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

            const listPayment = order
            res.render('user/paymentList', {
                listPayment,
                isLogin: true,
                title: 'Daftar Pembayaran',
                menuActive: 'payments'
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = PaymentControllers