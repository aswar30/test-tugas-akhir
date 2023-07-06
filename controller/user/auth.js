const {Masyarakat} = require('../../models')
const bcrypt = require('bcrypt')

class AuthController {
    static async viewRegister(req, res) {
        try {
            if(req.session.user == null | req.session.user == undefined){
                res.render('user/register')
            } else {
                res.redirect('/home')
            }
        } catch(error) {
            res.redirect('/register')
        }
    }

    static async actionRegister(req, res) {
        try {
            const {NIK, email, name} = req.body
            const password = await bcrypt.hash(req.body.password, 10)
            await Masyarakat.create({
                nomor_KTP: NIK,
                email: email,
                nama: name,
                kata_sandi: password
            })
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.redirect('/register')
        }
    }

    static async viewLogin(req, res) {
        try {
            if(req.session.user == null | req.session.user == undefined){
                res.render('user/login', {
                    menuActive: '',
                })
            }else {
                res.redirect('/home')
            }
        } catch(error) {
            console.log(error)
            res.redirect('/login')
        }
    }

    static async actionLogin(req, res) {
        try {
            const {email, password} = req.body
            const validateEmail = await Masyarakat.findOne({where: {email: email}})
            const isPasswordMatch = await bcrypt.compare(password, validateEmail.kata_sandi)
            if(!isPasswordMatch || !validateEmail) {
                return res.redirect('/login')
            }
            req.session.user = {
                id: validateEmail.id,
                email: validateEmail.email,
                role: 'user',
                name: validateEmail.nama
            }
            return res.redirect('/home')
        } catch(error) {
            console.log(error)
            return res.redirect('/login')
        }
    }

    static async viewHome(req, res) {
        try {
            const {name} = req.session.user
            res.render('user/home', {
                name,
                title: 'Home',
                menuActive: 'home',
            })
        } catch(error) {
             return res.redirect('/login')
        }
    }

    static async actionLogOut(req, res) {
        try {
            req.session.destroy()
            return res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = AuthController