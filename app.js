/** Main starting point of the application.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const logger = require('morgan')

const app = express()

// Set view engine
app.set('view engine', 'hbs')

// Configure view engine
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts,', 'default')
}))

// Configure views path
app.set('views', path.join(__dirname, 'views'))

// Set up routes
app.use('/', require('./routes/homeRouter'))

// Test
app.listen(8000, () => console.log('Testing server at http://localhost:8000'))
