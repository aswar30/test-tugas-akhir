const express = require('express')

const router = express.Router()

const Auth = require('../../controller/auth')
const Lahan = require('../../controller/user/lahanMakan')
const Jenazah = require('../../controller/user/corpse')
const Payment = require('../../controller/user/payment')
const Order = require('../../controller/user/order')

const {authUser} = require('../../middlewere/auth')

const {multiUpluad} = require('../../middlewere/multer')

router.get('/login', Auth.viewLogin)
router.post('/login', Auth.actionLogin)
router.get('/logout', Auth.actionLogOut)

router.get('/home', Auth.viewHome)

router.get('/register', Auth.viewRegister)
router.post('/register', Auth.actionRegister)

router.get('/input-corpse-data/:idBurialGrounds/:blockId', authUser, Jenazah.viewCorpse)
router.post('/input-corpse-data/:idBurialGrounds/:blockId', authUser, multiUpluad, Jenazah.actionCorpse)

router.get('/payments-burial-grounds/:idOrder', authUser, Payment.viewPayment)
router.get('/list-payments', authUser, Payment.viewListPaymnet)

router.get('/list-orders', authUser, Order.viewOrderHistory)
router.get('/detail-order/:orderId', authUser, Order.viewDetailOrder)

router.get('/', Auth.redirectToListGrouns)

router.get('/list-lahan-makam', Lahan.viewLahanMakam)

router.post("/notification", Order.Notifications)

module.exports = router;