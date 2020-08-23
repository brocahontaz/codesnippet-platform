/**
 * Configuration for Mongoose
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const mongoose = require('mongoose')

/**
 * Establish a connection to the MongoDB.
 *
 * @returns {Promise} connection promise
 */
module.exports.connect = async () => {
  mongoose.connection.on('connected', () => console.log('Mongoose connection established.'))
  mongoose.connection.on('error', err => console.error(`Mongoose connection error: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection closed.'))

  // Close connection on node process end
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection closed due to application termination.')
      process.exit(0)
    })
  })

  // Connect to the server
  return mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
