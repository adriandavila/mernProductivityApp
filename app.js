const path = require('path')
const express = require('express')
// const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan') // For logging requests into the console
const { engine } = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db') // To connect the database

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Connect Database
connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging requests to the console
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars helpers
const { formatDate, formatTasks, truncate, editIcon, select, isComplete, getDate, chkTask, removeWhitespace } = require('./helpers/hbs')
// Handlebars
app.engine('.hbs', engine({ 
    helpers: {
        formatDate,
        formatTasks,
        truncate,
        editIcon,
        select,
        isComplete,
        getDate,
        chkTask,
        removeWhitespace,
    }, 
    extname: '.hbs', defaultLayout: 'main' })
);
app.set('view engine', '.hbs');

// Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/schedule', require('./routes/schedule'))

const PORT = process.env.PORT || 3000


app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)