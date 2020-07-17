'use strict'

const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  snippet: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet
