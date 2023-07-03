const {Masyarakat} = require('../models')
module.exports = {
    authUser: async (req, res, next) => {
         try{
            if(req.session.user == null | req.session.user == undefined)  return res.redirect('/login')
            const {id: userId} = req.session.user
            const verifyUser = await Masyarakat.findOne({where: {id: userId}})
            if(!verifyUser)  return res.redirect('/login')
            next()
         } catch(error){
            res.redirect('/login')
         }
    }
}