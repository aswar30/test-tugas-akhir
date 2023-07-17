const { Op } = require("sequelize")
const {Lahan_Makam, Blok} = require('../models')

module.exports = {
        validateNumberBurialGround: async (number, blockId) => {
            const burialGround = await Lahan_Makam.findOne({
                where: {
                    blok_id: blockId,
                    Nomor: number
                }
            })
            const {kode} = await Blok.findOne({where: {id: blockId}})
            if(burialGround) throw new Error(`Nomor Lahan Makam ${number} Sudah Terdaftar Pada Blok ${kode}`)
        },
        validateUpdateBurialGround: async (number, blockId, id) => {
            const burialGround = await Lahan_Makam.findOne({
                where: {
                    blok_id: blockId,
                    Nomor: number,
                    id: {[Op.ne]: id }
                }
            })
            const {kode} = await Blok.findOne({where: {id: blockId}})
            if(burialGround) throw new Error(`Nomor Lahan Makam ${number} Sudah Ada Pada Blok ${kode}`)
        }
}