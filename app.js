/** Main starting point of the application.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

require('dotenv').config()

// const createError = require('http-errors')
const express = require('express')
const hbs = require('express-hbs')
const path = require('path')
const session = require('express-session')
// const logger = require('morgan')

const mongoose = require('./configs/mongoose')

const app = express()

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

// Set up routes
app.use('/', require('./routes/homeRouter'))
app.use('/user', require('./routes/userRouter'))

// Set up sessions
const sessionOptions = {
  name: 'testcookie',
  secret: 'testsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
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

// Catch file not found
app.use('*', (req, res, next) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'views', 'errors', '404.html'))
})

// Handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})

// Test
app.listen(8000, () => console.log('Testing server at http://localhost:8000'))
