const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const app = express()
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

// Require passport config
require("./config/passport")(passport)
// Mongoose
mongoose.connect('mongodb://localhost/verbapp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to mongodb'))
.catch((err) => console.log(err))

// EJS
app.set('view engine', 'ejs')
app.use(expressEjsLayout)
app.use(express.static(__dirname + '/public'));
//BodyParser
app.use(express.urlencoded({ extended: false }))
//CODE TO BE ENTERED
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})
// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(8080, (req, res) => {
    console.log('Connected on port: 8080');
})