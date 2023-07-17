const {Masyarakat, Pengelola_Makam} = require('../../models')
const {loginValidation, registerValidation} = require('../../validation/inputUser')
const bcrypt = require('bcrypt')

class AuthController {
    static async viewRegister(req, res) {
        try {
            if(req.session.user == null | req.session.user == undefined){
                const alertMessage = req.flash('alertMessage')
                const alertStatus = req.flash('alertStatus')
                const alert = { message: alertMessage, status: alertStatus }
                res.render('user/register', {
                    alert
                })
            } else {
                res.redirect('/home')
            }
        } catch(error) {
            res.redirect('/register')
        }
    }

    static async actionRegister(req, res) {
        try {
            registerValidation(req.body)
            const {NIK, email, name, numberPhone, placeOfBirth, dateOfBirth, address, work, gender} = req.body
            const password = await bcrypt.hash(req.body.password, 10)
            const validateEmail = await Masyarakat.findOne({where: {email: email}})
            if(validateEmail) {
                req.flash('alertMessage', 'Email Sudah Terdaftar Silahkan Masuk')
                req.flash('alertStatus', 'danger')
                return res.redirect('/register')
            }
            console.log(req.body)
            await Masyarakat.create({
                nomor_KTP: NIK,
                email: email,
                nama: name,
                tempat_lahir: placeOfBirth,
                tanggal_lahir: dateOfBirth,
                pekerjaan: work,
                alamat: address,
                no_HP: numberPhone,
                jenis_kelamin: gender,
                kata_sandi: password
            })
            req.flash('alertMessage', 'Pendaftaran Berhasil Silahkan Login')
            req.flash('alertStatus', 'success')
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/register')
        }
    }

    static async viewLogin(req, res) {
        try {
            if(req.session.user == null | req.session.user == undefined){
                const alertMessage = req.flash('alertMessage')
                const alertStatus = req.flash('alertStatus')
                const alert = { message: alertMessage, status: alertStatus }
                res.render('user/login', {
                    isLogin: req.session.user,
                    alert,
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
            loginValidation(req.body)
            const {email, password} = req.body
            let validateAdmin = null
            let isPasswordAdminrMatch = null
            let isPasswordUserMatch = null
            const validateUser = await Masyarakat.findOne({where: {email: email}})
            if(!validateUser) {
                validateAdmin = await Pengelola_Makam.findOne({where: {email: email}})
                if(!validateAdmin) {
                    req.flash('alertMessage', 'User yang anda masukan tidak ada!!')
                    req.flash('alertStatus', 'danger')
                    return res.redirect('/login')
                }
                isPasswordAdminrMatch = await bcrypt.compare(password, validateAdmin.kata_sandi)
            }else {
                isPasswordUserMatch = await bcrypt.compare(password, validateUser.kata_sandi)
            }
            if(isPasswordUserMatch && validateUser ) {
                req.session.user = {
                id: validateUser.id,
                email: validateUser.email,
                name: validateUser.nama,
            }
            return res.redirect('/home')
            } else if( validateAdmin && isPasswordAdminrMatch) {
                req.session.user = {
                    id: validateAdmin.id,
                    email: validateAdmin.email,
                    name: validateAdmin.nama
                }
                return res.redirect('/admin/lahan-makam')
            }
        } catch(error) {
            console.log(error)
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
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