const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    status: {
        type: String,
        default: "incomplete",
        enum: ['complete','incomplete']
    },
    whenToComplete: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', TaskSchema)