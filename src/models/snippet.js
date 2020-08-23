/**
 * Mongoose schema/model for the snippets.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const mongoose = require('mongoose')

// Snippet Mongoose schema
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

/**
 * Get all snippets created by user.
 *
 * @param {string} username the username
 * @returns {object} Mongoose query object
 */
SnippetSchema.statics.getAllByName = async function (username) {
  return await this.find({ username }, null).sort({ createdAt: 'descending' })
}

/**
 * Get snippet by id.
 *
 * @param {string} id the id
 * @returns {object} Mongoose query object
 */
SnippetSchema.statics.getSnippet = async function (id) {
  return await this.findById(mongoose.Types.ObjectId(id), null)
}

/**
 * Get all snippets.
 *
 * @returns {object} Mongoose query object
 */
SnippetSchema.statics.getAll = async function () {
  return await this.find().sort({ createdAt: 'descending' })
}

/**
 * Get all snippets by tag.
 *
 * @param {string} tag the tag
 * @returns {object} Mongoose query object
 */
SnippetSchema.statics.getAllByTag = async function (tag) {
  return await this.find({ tags: tag }, null).sort({ createdAt: 'descending' })
}

/**
 * Update a snippet.
 *
 * @param {string} id the snippet id
 * @param {object} data the data
 * @returns {object} Mongoose query object
 */
SnippetSchema.statics.updateSnippet = async function (id, data) {
  return await this.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, data, {
    new: true
  })
}

/**
 * Delete a snippet.
 *
 * @param {string} id the snippet id
 * @returns {object} Mongoose query object
 */
SnippetSchema.statics.deleteSnippet = async function (id) {
  return await this.findByIdAndDelete({ _id: mongoose.Types.ObjectId(id) })
}

const Snippet = mongoose.model('Snippet', SnippetSchema)

module.exports = Snippet
