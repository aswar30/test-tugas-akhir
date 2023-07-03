const Joi = require('joi')

module.exports = {
    registerValidation: (data) => {
        const schema = Joi.object({
            nomor_KTP: Joi.number().min(16).max(16).required(),
            email: Joi.string().email().required(),
            nama: Joi.string().min(3).required(),
            kata_sandi: Joi.string().min(8).required()
        })
        schema.validate(data)
    },
    loginValidation: (data) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            kata_sandi: Joi.string().min(8).required()
        })
        schema.validate(data)
    },
    CorpseValidation:  (data) => {
        const schema = Joi.object({
             nama: Joi.string().required(),
             NIK: Joi.string().min(16).max(16).required(),
             jenis_kelamin: Joi.string().valid('Laki-Laki', 'Perempuan').required(),
             tutup_usia: Joi.number().max(2).required(),
             tanggal_meninggal: Joi.date().required(),
             tanggal_dikebumikan: Joi.date().required(),
        })
        schema.validate(data)
    }
}