'use strict'

const mongoose = require('mongoose')

module.exports.connect = async () => {
  mongoose.connection.on('connected', () => console.log('Mongoose connection established.'))
  mongoose.connection.on('error', err => console.error(`Mongoose connection error: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection closed.'))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection closed due to application termination.')
      process.exit(0)
    })
  })

  return mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
