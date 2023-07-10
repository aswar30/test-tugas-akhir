const express = require('express');

const router = express.Router();

const Lahan = require('../../controller/admin/lahanMakam')

const {singleUpload} = require('../../middlewere/multer')

const {authAdmin} = require('../../middlewere/auth')

router.get('/lahan-makam', authAdmin, Lahan.viewLahanMakam)

router.get('confirm-order/:orderId', authAdmin)

router.get('/delete-lahan-makam/:groudsId', authAdmin, Lahan.actionDelete)

router.get('/add-lahan-makam', authAdmin, Lahan.viewCreate)
router.post('/add-lahan-makam', authAdmin, singleUpload, Lahan.actionCreate)

module.exports = router;