'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/userController')

router.get('/', controller.index)

router.get('/signin', controller.signin)

router.get('/register', controller.register)

module.exports = router
