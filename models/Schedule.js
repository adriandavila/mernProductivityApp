const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
    day: {
        type: Date,
    },
    quoteOfTheDay: {
        type: String,
        default: '...'
    },
    tasks: {
        type: Array,
    },
    status: {
        type: String,
        default: 'shown',
        enum: ['shown','archived']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Schedule', ScheduleSchema)