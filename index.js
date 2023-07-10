require ('dotenv').config()

const express = require('express')
const cors = require('cors')
const session = require('express-session')

const admin = require('./router/admin/auth')
const user = require('./router/user/auth')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(
  session({ secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  //cookie: { maxAge: 60000 }
 })
)

app.use('/admin', admin)
app.use(user)

app.use( (req, res) => {
    res.redirect('/login')
})

console.log(`App running on port ${process.env.PORT}`)

app.listen(process.env.PORT)
