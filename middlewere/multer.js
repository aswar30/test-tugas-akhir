const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({storage : storage})
const multiUpluad = upload.fields([
    {name: 'photoIdCard'},
    {name: 'photoYellowCard'},
    {name: 'photoRTRWCertificate'},
    {name: 'familyCard'},
    {name: 'idcardOfHeirs'},
    {name: 'descriptionOfDeathInHospital'}
])

const singleUpload = multer({storage: storage}).single('photoGrounds')
module.exports = {
    multiUpluad,
    singleUpload
}