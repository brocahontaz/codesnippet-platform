'use strict'

const User = require('../models/user')
const Snippet = require('../models/snippet')

const userController = {}

userController.index = (req, res) => {
  res.render('user/index')
}

userController.signin = (req, res) => {
  if (req.session.user) {
    res.redirect('..')
  } else {
    res.render('user/signin')
  }
}

userController.signinPost = async (req, res) => {
  // console.log('test2')
  // console.log(req.body.email)
  // console.log(req.body.password)
  try {
    const user = await User.authenticate(req.body.email, req.body.password)
    // console.log('auth', user)
    req.session.regenerate(() => {
      req.session.user = user.username
      req.session.email = user.email
      req.session.loggedIn = true
      req.session.flash = { type: 'success', text: 'Welcome ' + user.username + '!' }
      res.redirect('/')
      console.log(req.session)
      console.log('REGEN', req.session.user)
    })
  } catch (err) {
    req.session.data = { form: { email: req.body.email } }
    req.session.flash = { type: 'danger', text: err.message }
    res.redirect('./signin')
  }
}

userController.register = (req, res) => {
  if (req.session.user) {
    res.redirect('..')
  } else {
    res.render('user/register')
  }
}

userController.registerPost = async (req, res) => {
  if (req.body.password === req.body.password2) {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
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
    // res.render('user/register')
  }
}

userController.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('..')
  })
}

userController.showUser = async (req, res) => {
  // console.log(req.params)
  const snippets = await Snippet.getAllByName(req.params.user)

  console.log(snippets)
  const viewData = {
    user: req.params.user,
    email: req.params.email,
    snippets: snippets
  }

  res.render('user/index', viewData)
}

module.exports = userController
