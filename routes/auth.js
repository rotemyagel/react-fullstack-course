const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const validateRegisterInput = require('../validation/registerValidation')

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/test', (req, res) => {
    res.send('Auth route test')
})

// @route   POST api/register
// @desc    create a new user
// @access  Public

router.post('/register', async (req, res) => {
    try {

        const { errors, isValid } = validateRegisterInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        // Check if user already exists

        const existingUser = await User.findOne({ email: new RegExp('^' + req.body.email + '$', 'i') })

        existingUser ? res.status(400).json({ msg: 'User already exists' }) : null

        // hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 12)

        // create a new user
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        })

        // save the user
        const savedUser = await newUser.save()

        // return the saved user
        return res.json(savedUser)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

module.exports = router

