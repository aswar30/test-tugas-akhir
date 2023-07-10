const {Masyarakat, Pengelola_Makam} = require('../models')
module.exports = {
    authUser: async (req, res, next) => {
         try{
            if(req.session.user == null | req.session.user == undefined)  return res.redirect('/login')
            const {id: userId, email: userEmail} = req.session.user
            const verifyUser = await Masyarakat.findOne({where: {id: userId, email: userEmail}})
            if(!verifyUser) return res.redirect('/login')
            next()

         } catch(error){
            return res.redirect('/login')
         }
    },
    authAdmin: async (req, res, next) => {
      try{
            if(req.session.user == null | req.session.user == undefined)  return res.redirect('/login')
            const {id: adminId, email: adminEmail} = req.session.user
            const verifyUser = await Pengelola_Makam.findOne({where: {id: adminId, email:adminEmail}})
            if(!verifyUser)  return res.redirect('/login')
            next()
         } catch(error){
            res.redirect('/login')
         }
    }
}