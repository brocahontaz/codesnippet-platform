/**
 * User router.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/userController')

// Route user index
router.get('/', controller.index)

// Route signin
router.get('/signin', controller.signin)
router.post('/signin', controller.signinPost)

// Route register
router.get('/register', controller.register)
router.post('/register', controller.registerPost)

// Route logout
router.get('/logout', controller.logout)

// Route show user
router.get('/:user', controller.showUser)

module.exports = router
