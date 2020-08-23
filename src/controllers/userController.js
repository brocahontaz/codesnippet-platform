/**
 * User controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const User = require('../models/user')
const Snippet = require('../models/snippet')

const userController = {}

/**
 * User index, redirect back.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
userController.index = (req, res) => {
  res.render('..')
}

/**
 * Show sign in page.
 * Redirect back if session already in place.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
userController.signin = (req, res) => {
  if (req.session.user) {
    res.redirect('..')
  } else {
    res.render('user/signin')
  }
}

/**
 * Sign in user.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
userController.signinPost = async (req, res) => {
  try {
    const user = await User.authenticate(req.body.email, req.body.password)
    req.session.regenerate(() => {
      req.session.user = user.username
      req.session.email = user.email
      req.session.loggedIn = true
      req.session.flash = { type: 'success', text: 'Welcome ' + user.username + '!' }
      res.redirect('/')
    })
  } catch (err) {
    req.session.data = { form: { email: req.body.email } }
    req.session.flash = { type: 'danger', text: err.message }
    res.redirect('./signin')
  }
}

/**
 * Show register page.
 * Redirect back if session already in place.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
userController.register = (req, res) => {
  if (req.session.user) {
    res.redirect('..')
  } else {
    res.render('user/register')
  }
}

/**
 * Register new user.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
userController.registerPost = async (req, res) => {
  // Check if passwords are the same
  if (req.body.password === req.body.password2) {
    try {
      const user = new User({
        username: req.body.username.trim(),
        email: req.body.email.trim(),
        password: req.body.password.trim()
      })

      await user.save()

      req.session.flash = { type: 'success', text: 'New account successfully created! Please sign in to start using the platform! :)' }
      res.redirect('./signin')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      req.session.data = { form: { username: req.body.username, email: req.body.email } }
      res.redirect('./register')
    }
  } else {
    req.session.data = { form: { username: req.body.username, email: req.body.email } }
    req.session.flash = { type: 'danger', text: 'Passwords does not match!' }
    res.redirect('./register')
  }
}

/**
 * Signout user, destroying the session.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
userController.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('..')
  })
}

/**
 * Show a user page, with all its created snippets.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 * @returns {object} forward error
 */
userController.showUser = async (req, res, next) => {
  // console.log(req.params)
  try {
    const snippets = await Snippet.getAllByName(req.params.user)

    const viewData = {
      username: req.params.user,
      email: req.params.email,
      snippets: snippets
    }

    res.render('user/index', viewData)
  } catch (err) {
    err.statusCode = 500
    return next(err)
  }
}

module.exports = userController
