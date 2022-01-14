const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan') // For logging requests into the console
const { engine } = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db') // To connect the database

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Connect Database
connectDB()

const app = express()

// Logging requests to the console
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', engine({ 
//     helpers: {
//     formatDate,
//     stripTags,
//     truncate,
//     editIcon,
//     select,
// }, 
extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

// Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({
    //     mongoUrl: process.env.MONGO_URI
    // })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000


app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)