const { Blok } = require('../../models')

class BlokController {
    static async addBlok( req, res ) {
        try {
            const { kode } = req.body
            await Blok.create({ kode })
        } catch(error) {
            res.redirect('/admin/category')
        }
    }
}

module.exports = BlokController