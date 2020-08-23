/** Main starting point of the application.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

require('dotenv').config()

const express = require('express')
const hbs = require('express-hbs')
const path = require('path')
const session = require('express-session')
const logger = require('morgan')
const moment = require('moment')

const mongoose = require('./configs/mongoose')

// Date formats
const DateFormats = {
  short: 'MMM Do YY',
  long: 'MMMM Do YYYY, HH:mm:ss'
}

const app = express()

// Register ifEquals helper for hbs
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
})

// Register formatDate helper for hbs
hbs.registerHelper('formatDate', function (datetime, format) {
  if (moment) {
    format = DateFormats[format] || format
    console.log('datum', datetime)
    return moment(datetime).format(format)
  } else {
    return datetime
  }
})

// Set up logger
app.use(logger('dev'))

// Set up sessions
const sessionOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  }
}

app.use(session(sessionOptions))

// Set up flash messages
app.use((req, res, next) => {
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }
  next()
})

// Middleware for confirm dialog
app.use((req, res, next) => {
  if (req.session.confirm) {
    res.locals.confirm = req.session.confirm
    delete req.session.confirm
  }
  next()
})

// Middleware for persisting data
app.use((req, res, next) => {
  if (req.session.data) {
    res.locals.data = req.session.data
    delete req.session.data
  }
  app.locals.email = req.session.email
  app.locals.user = req.session.user
  app.locals.loggedIn = req.session.loggedIn
  next()
})

// Middleware for user logged in
app.use((req, res, next) => {
  app.locals.email = req.session.email
  app.locals.user = req.session.user
  app.locals.loggedIn = req.session.loggedIn
  next()
})

// Connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

// Set view engine
app.set('view engine', 'hbs')

// Configure view engine
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

// Configure views path
app.set('views', path.join(__dirname, 'views'))

// Set up body usage
app.use(express.urlencoded({ extended: false }))

// Set up static path
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/user', express.static(path.join(__dirname, 'public')))
app.use('/snippet', express.static(path.join(__dirname, 'public')))
app.use('/tag', express.static(path.join(__dirname, 'public')))
app.use('/errors', express.static(path.join(__dirname, 'public')))

// Set up routes
app.use('/', require('./routes/homeRouter'))
app.use('/user', require('./routes/userRouter'))
app.use('/snippet', require('./routes/snippetRouter'))
app.use('/tag', require('./routes/tagRouter'))

// Catch file not found
app.use('*', (req, res, next) => {
  const err = new Error()
  err.statusCode = 404
  next(err)
})

// Handle errors
app.use((err, req, res, next) => {
  if (err.statusCode === 403) {
    err.message = 'Resource forbidden!'
  } else if (err.statusCode === 404) {
    err.message = 'Resource not found!'
  } else if (err.statusCode === 500) {
    err.message = 'Internal server error!'
  }
  res.status(err.statusCode || 500).render('errors/error', { err })
})

// Test
app.listen(8000, () => console.log('Testing server at http://localhost:8000'))
