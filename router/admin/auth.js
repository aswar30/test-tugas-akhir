const express = require('express');

const router = express.Router();

const Lahan = require('../../controller/admin/lahanMakam')

const {singleUpload} = require('../../middlewere/multer')

router.get('/lahan-makam', Lahan.viewLahanMakam)

router.get('/add-lahan-makam', Lahan.viewCreate)
router.post('/add-lahan-makam', singleUpload, Lahan.actionCreate)

module.exports = router;