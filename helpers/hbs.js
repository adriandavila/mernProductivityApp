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
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/schedule/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/schedule/edit/${storyId}><i class="fas fa-edit"></i></a>`
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
        var year = moment(date).format('YYYY')
        var month = moment(date).format('MM')
        var day = moment(date).format("DD")
        return year.concat("-",month,"-",day)
    },
    chkTask: function (task) {
        console.log("beep")
    }, 
    removeWhitespace: function(s) {
        return s.replace(/\s+/g, '')
    }
}