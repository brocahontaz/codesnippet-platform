'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/userController')

router.get('/', controller.index)

router.get('/signin', controller.signin)
router.post('/signin', controller.signinPost)

router.get('/register', controller.register)
router.post('/register', controller.registerPost)

router.get('/logout', controller.logout)

router.get('/:user', controller.showUser)

module.exports = router
