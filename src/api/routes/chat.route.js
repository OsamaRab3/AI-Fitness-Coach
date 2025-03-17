const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat.controller')


router.route('/:userId')
    .post(chatController.startChat)
    .get(chatController.getAllChat)


router.post('/:userId/chats/:chatId', chatController.sendMessageToChat);


module.exports = router;