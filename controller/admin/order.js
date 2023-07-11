const {Pesanan} = require('../../models')

class OderController {
    static async viewOder (req, res) {
        try {
            if(search && status){
                listOrder =  await Pesanan.findAll({
                    where: {
                        [Op.and]: [{
                            Nomor: {
                                [Op.substring]: search
                            }
                        }, 
                        { 
                             status
                        }
                    ]
                },
                include: [
                    {model: Blok}
                ]})}
            else if(search){
                listOrder = await Lahan_Makam.findAll({
                    where: {
                        Nomor: {
                            [Op.substring]: search
                        }
                    },
                    include: [
                    {model: Blok},
            ]})

            }
            else if(status){
                listOrder = await Lahan_Makam.findAll({
                    where: { status },
                    include: [
                    {model: Blok}
                    ]
                })
            }
            else listOrder = await Lahan_Makam.findAll({
                include: [
                    {model: Blok},
            ]})
        } catch (error) {

        }
    }
}