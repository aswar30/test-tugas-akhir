const express = require('express');
const router = express.Router();

const Lahan = require('../../controller/admin/lahanMakam')
const Order = require('../../controller/admin/order')
const Payment = require('../../controller/admin/payment')
const {singleUpload} = require('../../middlewere/multer')
const {authAdmin} = require('../../middlewere/auth')
const Auth = require('../../controller/auth')

router.get('/lahan-makam', authAdmin, Lahan.viewLahanMakam)

router.get('/confirm-order/:orderId', authAdmin, Order.confirmOrder)
router.get('/rejected-order/:orderId', authAdmin, Order.rejectOrder)

router.get('/home', authAdmin, Auth.viewHomeAdmin)

router.get('/list-order', authAdmin, Order.viewOderHistory)
router.get('/detail-order/:orderId', authAdmin, Order.viewDetailOrder)

router.get('/delete-lahan-makam/:groudsId', authAdmin, Lahan.actionDelete)

router.get('/list-payments', authAdmin, Payment.viewListPaymnet)

router.get('/add-lahan-makam', authAdmin, Lahan.viewCreate)
router.post('/add-lahan-makam', authAdmin, singleUpload, Lahan.actionCreate)
router.get('/update-lahan-makam/:groundId', authAdmin, Lahan.viewUpdate)
router.post('/update-lahan-makam/:groundId', authAdmin, singleUpload, Lahan.actionUpdate)

module.exports = router;