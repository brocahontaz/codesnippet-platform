'use strict'

const mongoose = require('mongoose')

const SnippetSchema = new mongoose.Schema({
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
    required: true,
    minlength: [1, 'Snippet cannot be empty!']
  }
}, {
  timestamps: true
})

SnippetSchema.statics.getAllByName = function(username) {
  return this.find({username})
}

const Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet
