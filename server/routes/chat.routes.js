const Router = require('express')
const router = new Router()
const chatController = require('../controller/chat.controller')

router.get('/chat', chatController.getChat)

module.exports = router

