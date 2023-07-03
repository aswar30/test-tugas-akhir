const moment = require('moment')
const { Op } = require("sequelize")
const {Data_Jenazah, Pesanan, Lahan_Makam} = require('../../models')

const {validateSizeFile} = require('../../middlewere/validateSize')
const {saveImage} = require('../../helper/firebase')
const Snap = require('../../helper/midtrans')

moment.locale('id')
let dateNow = moment().format()

class CorpseControllers {
    static async viewCorpse(req, res) {
        try {
            const {idBurialGrounds, blockId} = req.params
            res.render('user/inputCorpseData', {
                idBurialGrounds,
                blockId,
                title: 'Data Jenazah',
                menuActive: 'grounds',
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async actionCorpse(req, res) {
       try {
         const {idBurialGrounds, blockId} = req.params
         const {id: userId, name: userName, email : userEmail} = req.session.user
         const { name, gender, die, NIK, dateOfDeath, dateOfBurial} = req.body
        
         const lahan = await Lahan_Makam.findOne({where : {
            id : idBurialGrounds,
            status: {[Op.ne]: 'terisi'}
        }})
         const totalPrice = lahan.harga

         const orderId =  "APP-" + userId + "-" + new Date().getTime()
         
         const parameter = {
          "transaction_details": {
              "order_id": orderId,
              "gross_amount": totalPrice
            },
            "credit_card": {
                "secure" : true
            },
            "customer_details": {
                "first_name": userName,
                "email": userEmail,
            }
        }
        const requestPaymentToken = await Snap.createTransaction(parameter)

         await validateSizeFile(req.files)
         const { 
            urlIdCard,
            urlYellowCard, 
            urlRTRWCertificate, 
            urlFamilyCard,
            urlIdcardOfHeirs, 
            urlDescriptionOfDeathInHospital 
         } = await saveImage(req.files)
         
         const {id} = await await Data_Jenazah.create({
            masyarakat_id: userId,
            nama: name,
            NIK: NIK,
            jenis_kelamin: gender,
            tutup_usia: die,
            KTP: urlIdCard,
            kartu_Kelaurga: urlFamilyCard,
            kartu_kuning: urlYellowCard,
            surat_keterangan_RTRW: urlRTRWCertificate,
            surat_keterangan_meninggal_RS: urlDescriptionOfDeathInHospital,
            KTP_ahli_waris: urlIdcardOfHeirs,
            tanggal_meninggal: dateOfDeath,
            tanggal_dikebumikan: dateOfBurial
         })

        const {id: idOrder} = await Pesanan.create({
            blok_id: blockId,
            masyarakat_id: userId,
            lahan_makam_id: idBurialGrounds,
            data_jenazah_id: id,
            jumlah_pembayaran: totalPrice,
            url_midtrans: requestPaymentToken.redirect_url,
            token_midtrans: requestPaymentToken.token,
            order_id_midtrans: orderId,
            nomor_pesanan: orderId,
            Tanggal: dateNow,
        })
        await Lahan_Makam.update({status: 'terisi'}, {where: {id: idBurialGrounds}})
        return res.redirect(`/payments-burial-grounds/${idOrder}`)
       } catch (error) {
        console.log(error)
         const {idBurialGrounds, blockId} = req.params
        res.redirect(`/input-corpse-data/${idBurialGrounds}/${blockId}`)
       }
    }
}

module.exports = CorpseControllers