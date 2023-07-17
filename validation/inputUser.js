const Joi = require('joi')
const errorMessage = (data) => {
    if(!data.error) return ''
    else throw new Error(data.error.message)
}
module.exports = {
    registerValidation: (data) => {
        const Schema = Joi.object({
            NIK: Joi.string().max(16).min(16).pattern(new RegExp('^[0-9]+$')).messages({"NIK" : "Harus Berjumlah 16 Angka 0 - 9"}).required(),
            email: Joi.string().email().required(),
            name: Joi.string().min(3).required(),
            password: Joi.string().min(8).required(),
            numberPhone: Joi.string().min(12).max(12).pattern(new RegExp('^[0-9]+$')).required(), 
            placeOfBirth: Joi.string().required(), 
            dateOfBirth: Joi.date().required(), 
            address: Joi.string().required(),
            work: Joi.string().required(), 
            gender: Joi.string().valid('Laki-Laki', 'Perempuan').required(),
        })
        errorMessage(Schema.validate(data))
    },
    loginValidation: (data) => {
        const Schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        })
        errorMessage(Schema.validate(data))
    },
    CorpseValidation: (data) => {
        const Schema = Joi.object({
             name: Joi.string().required().messages({"nama" : "Harus di Isi"}),
             NIK: Joi.string().max(16).min(16).pattern(new RegExp('^[0-9]+$')).required().messages({"NIK" : "Harus Berjumlah 16 Angka 0 - 9"}),
             gender: Joi.string().valid('Laki-Laki', 'Perempuan').required(),
             die: Joi.number().max(999).required(),
             dateOfDeath: Joi.date().required(),
             dateOfBurial: Joi.date().required(),
             address: Joi.string().required(),
             glassesId: Joi.number().required(),
             villageId: Joi.number().required(),
        })
        errorMessage(Schema.validate(data))
    }
}