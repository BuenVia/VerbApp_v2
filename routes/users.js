
const express = require('express')
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')
const passport = require('passport')
// Login handle
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})
// Register handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
    })
    //register post handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
    if (!name || !email || !password || !password2) {
        errors.push({msg: "Please fill in all fields" })
    }
    // Check if match
    if (password !== password2) {
        errors.push({ msg: "Passwords don't match" })
    }

    // Check if password is more than 6 characters
    if(password.length < 6) {
        errors.push({ msg: "Password needs to be at least 6 characters long" })
    }
    if(errors.length > 0) {
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2})
    } else {
        // Validation passed
        User.findOne({ email: email }).exec((err,user) => {
            console.log(user);
            if(user) {
                errors.push({ msg: 'Email already registered'})
                res.render('register', { errors, name, email, password, password2 })

            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                })
                // hash password
                    bcrypt.genSalt(10,(err, salt) => 
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) =>{
                            if(err) throw err
                            // Save pass to hash
                            newUser.password = hash
                        // Save user
                        newUser
                            .save()
                            .then((value)=>{
                        console.log(value);
                        req.flash('success_msg', 'You have registered successfully')
                        res.redirect('/users/login')
                        })
                        .catch(value => console.log(value))
                    
                    }))
            }
        })
    }
})
// Logout
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'You have logged out successfully')
        res.redirect('/users/login');
      })
})

module.exports = router