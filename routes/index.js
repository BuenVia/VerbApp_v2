const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require("../config/auth")

// Login page
router.get('/', (req, res) => {
    res.render('welcome')
})

// Register page
router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/dashboard', ensureAuthenticated,(req, res) => {
    res.render('dashboard', {
        user: req.user
    })
})

module.exports = router