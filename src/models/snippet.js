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
    trim: true,
    minLength: [1, 'Snippet name cannot be empty!']
  },
  snippet: {
    type: String,
    required: true,
    minlength: [1, 'Snippet cannot be empty!']
  },
  tags: {
    type: [String],
    required: false,
    default: undefined
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

SnippetSchema.statics.updateSnippet = async function (id, data) {
  return await this.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, data, {
    new: true
  })
}

SnippetSchema.statics.deleteSnippet = async function (id) {
  return await this.findByIdAndDelete({ _id: mongoose.Types.ObjectId(id) })
}

const Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet
