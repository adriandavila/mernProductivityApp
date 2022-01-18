const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Schedule = require('../models/Schedule')


// @desc    Show add page
// @route   GET /schedules/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('schedules/add')
})


// @desc    Show add page
// @route   POST /schedules/add
router.post('/', ensureAuth, async (req, res) => {
    try {        
        var tasks = req.body.tasks.split("; ")
        tasks.shift()
        tasks = tasks.map(function(tsk){
            return tsk.split("*.*")
        })

        req.body.tasks = tasks
        req.body.user = req.user.id

        await Schedule.create(req.body)
        res.redirect('/archive')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})



module.exports = router