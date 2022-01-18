const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Schedule = require('../models/Schedule')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/archive', ensureAuth, async (req, res) => {
    try {
        const allSchedules = await Schedule.find({ user: req.user.id }).sort({ day: 'desc' }).lean()
        console.log(allSchedules)
        res.render('archive', {
            name: req.user.firstName,
            allSchedules
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})



// @desc    Daily Schedule
// @route   GET /schedule
// router.get('/schedule', (req, res) => {
//     res.render('schedule')
// })


module.exports = router