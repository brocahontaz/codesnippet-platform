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
  snippet: {
    type: String,
    required: true,
    minlength: [1, 'Snippet cannot be empty!']
  },
  tags: {
    type: Array,
    required: false
  }
}, {
  timestamps: true
})

SnippetSchema.statics.getAllByName = async function (username) {
  return await this.find({ username }, null).sort({ createdAt: 'descending' })
}

SnippetSchema.statics.getSnippet = async function (id) {
  console.log('id', id)
  // mongoose.Types.ObjectId.fromString(id)
  return await this.findById(mongoose.Types.ObjectId(id), null)
}

SnippetSchema.statics.getAll = async function () {
  return await this.find().sort({ createdAt: 'descending' })
}

SnippetSchema.statics.getAllByTag = async function (tag) {
  return await this.find({ tags: tag }, null).sort({ createdAt: 'descending' })
}

const Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet
