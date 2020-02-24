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

// Set up view engine
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts,', 'default')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
