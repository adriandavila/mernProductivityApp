const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    formatTasks: function (tasks) {
        return tasks.map(function(tsk) {return tsk[0]}).join(', ')
    },
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    editIcon: function (scheduleUser, loggedUser, schedleId, floating = true) {
        if (scheduleUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/schedule/edit/${schedleId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/schedule/edit/${schedleId}><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
    },
    select: function (selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&'
            )
    },
    isComplete: function (input) {
        return (input=="complete")
    },
    getDate: function (date) {
        // var year = moment(date).format('YYYY')
        // var month = moment(date).format('MM')
        // var day = moment(date).format("DD")
        return moment(date).format('YYYY-MM-DD')
    },
    chkTask: function (task) {
        console.log("beep")
    }, 
    removeWhitespace: function(s) {
        try {
            return s.replace(/\s+/g, '')
        } catch (err) {
            return s
        }
    },
    getTaskList: function() {
        var lst = document.getElementById("task").getElementsByTagName("span")

        return lst
    }, parseTasks: function(taskList) {
        try {
            //console.log(taskList)
            taskList = taskList.map(function(element)  {
                return element.task.concat("*.*", element.status, "; ")
            })
            //console.log(taskList)
            var s = taskList.join('')
            return s
        } catch(err) {
            console.error("Error parsing tasks")
            return "Error"
        }
    }
}