const router = require('express').Router()

const auth = require('./admin/auth')

router.use('/users', User)
router.use('/', Specialist)
router.use('/doctors', Doctor)
router.use('/appointment', Appointment)
router.use('/payments', Payment)

module.exports = router