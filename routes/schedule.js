const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const { getTaskList } = require('../helpers/hbs')

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
        tasks = tasks.map(function(tsk){
            return {
                task: tsk[0],
                status: tsk[1]
            }
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

// @desc    Show all schedules
// @route   GET /schedules
router.get('/', ensureAuth, async (req, res) => {
    try {
        const schedules = await Schedule.find({ status: 'shown' })
            .populate('user')
            .sort({ day: 'desc' })
            .lean()

        res.render('schedules/index', {
            schedules,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc    Show edit page
// @route   GET /schedules/edit:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const schedule = await Schedule.findOne({
            _id: req.params.id
        }).lean()

        if (!schedule) {
            return res.render('error/404')
        }

        if (schedule.user != req.user.id) {
            res.redirect('/')
        } else {
            // schedule.tasks = schedule.tasks.map(function(tsk){
            //     return {
            //         task: tsk[0],
            //         status: tsk[1]
            //     }
            // })

            res.render('schedules/edit', {
                schedule
            })
        }

    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


// @desc    Update schedule
// @route   PUT /schedule/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        
        let schedule = await Schedule.findById(req.params.id).lean()

        if(!schedule){
            return res.render('error/404')
        }

        if (schedule.user != req.user.id) {
            res.redirect('/')
        } else {
            console.log(req.body)
            var tasks = req.body.tasks.split("; ")
            if(tasks.at(-1) == '') {
                tasks.pop()
            }

            tasks = tasks.map(function(tsk){
                return tsk.split("*.*")
            })
            tasks = tasks.map(function(tsk){
                return {
                    task: tsk[0],
                    status: tsk[1]
                }
            })

            req.body.tasks = tasks

            schedule = await Schedule.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })

            res.redirect('/schedule')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc    Delete schedule
// @route   DELETE /schedule/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Schedule.remove({ _id: req.params.id })
        res.redirect('/archive')
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})


module.exports = router