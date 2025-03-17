const chatServices = require('../../services/chat')
const asyncErrorHandler = require('../../utils/asyncErrorHandler')
const CustomError = require('../../utils/CustomError')

const startChat = asyncErrorHandler(async (req, res, next) => {
    const { userId } = req.params;
    const { prompt } = req.body;

    if (!userId || !prompt)
        throw new CustomError("mising userId or prompt  is required", 400);


    const { response, chatId } = await chatServices.startChat(userId, prompt);

    const io = req.app.get("io")
    io.to(`user_${userId}`).emit('newChat', { response, chatId , timestamp: new Date().toISOString()})

    res.status(201).json({
        status: "success",
        data: {
            response,
            chatId
        }
    })

})

const getAllChat = asyncErrorHandler(async (req, res, next) => {
    const { userId } = req.params;

    const chats = await chatServices.getAllChat(userId);

    res.status(200).json({
        status: "success",
        data: {
            chats
        }
    })

})


// Send a message to an existing chat
const sendMessageToChat = asyncErrorHandler(async (req, res, next) => {
    const { userId, chatId } = req.params;
    const { prompt } = req.body;

    if (!userId || !chatId || !prompt) {
        throw new CustomError("Missing userId, chatId, or prompt", 400);
    }

    const response  = await chatServices.sendPromptToExistingChat(chatId, userId, prompt);

    const io = req.app.get("io");
    io.to(`user_${userId}`).emit('chatMessage', { 
        response, 
        chatId, 
        timestamp: new Date().toISOString() 
    });

    res.status(200).json({
        status: "success",
        data: {
            response,
            chatId
        }
    });
});


const getChatHistory = asyncErrorHandler(async (req, res, next) => {
    const { userId, chatId } = req.params;

    if (!userId || !chatId) {
        throw new CustomError("Missing userId or chatId", 400);
    }

    const chat = await chatServices.getChatById(chatId, userId);

    res.status(200).json({
        status: "success",
        data: {
            chat
        }
    });
});




module.exports = {
    startChat,
    getAllChat,
    getChatHistory,
    sendMessageToChat

}