const {Lahan_Makam, Pesanan, Blok} = require('../../models')

class PaymentControllers {
    static async viewListPaymnet(req, res) {
        try {
            const order = await Pesanan.findAll({
                where: {
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
            res.render('admin/paymentList', {
                listPayment,
                title: 'Daftar Pembayaran',
                menuActive: 'payments'
            })
        } catch (error) {
            console.log(error)
        }
    }
} 

module.exports = PaymentControllers