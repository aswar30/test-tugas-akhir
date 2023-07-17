const moment = require('moment')
const { Op } = require("sequelize")
const {CorpseValidation} = require('../../validation/inputUser')
const {Data_Jenazah, Pesanan, Lahan_Makam, Kacamatan, Kelurahan} = require('../../models')

const {validateSizeFile} = require('../../middlewere/validateSize')
const {saveImage} = require('../../helper/firebase')
const Snap = require('../../helper/midtrans')

let dateNow = moment().locale('id').format('Do MMMM YYYY')
console.log(dateNow)

class CorpseControllers {
    static async viewCorpse(req, res) {
        try {
            const {idBurialGrounds, blockId} = req.params
            const kacamatan = await Kacamatan.findAll()
            const kelurahan = await Kelurahan.findAll()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('user/inputCorpseData', {
                alert,
                kacamatan,
                kelurahan,
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
         const {id: userId, 
            name: userName, 
            email : userEmail} 
            = req.session.user
            CorpseValidation(req.body)
         const {
            name, 
            gender, 
            die, 
            NIK, 
            dateOfDeath, 
            dateOfBurial, 
            glassesId, 
            villageId, 
            address} = req.body
        
         const lahan = await Lahan_Makam.findOne({where : {
            id : idBurialGrounds,
            status: {[Op.ne]: 'terisi'}
        }})
         const totalPrice = lahan.harga

         const orderId =  "PLM-" + userId + "-" + new Date().getTime()
         
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
         
         const {id} = await Data_Jenazah.create({
            masyarakat_id: userId,
            kelurahan_id: villageId,
            kacamatan_id: glassesId,
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
            alamat: address,
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
        req.flash('alertMessage', error.message)
        req.flash('alertStatus', 'danger')
        res.redirect(`/input-corpse-data/${idBurialGrounds}/${blockId}`)
       }
    }
}

module.exports = CorpseControllers