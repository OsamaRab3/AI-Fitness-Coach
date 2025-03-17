const CustomError = require("../utils/CustomError");
const genertPrompt = require("../utils/genertPrompt");
const { getUSerById } = require("./profile")



const Chat = require('../models/chatSchema');
const User = require('../models/userSchema');

const startChat = async (userId, prompt) => {


    const user = await User.findById(userId); 
    if (!user) {
        throw new CustomError("User Not found", 404);
    }

    const response = await genertPrompt(prompt); 
    
    const newChat = await Chat.create({
        createdBy: userId,
        messages: [
          { content: prompt, role: 'user' },
          { content: response, role: 'assistant' }
        ],
        title: prompt.substring(0, 30) + (prompt.length > 30 ? '...' : '')
      });
    return { response, chatId: newChat._id };
}

const sendPromptToExistingChat = async (chatId,userId,prompt) => {
  

    const [chat,user] = await Promise.all([
        getChatById(chatId,userId),
        getUSerById(userId)
    ])

    if (!user ||!chat){
        throw new CustomError("USer or Chat not found",404);
    }

    const res = await genertPrompt(prompt);

    return res;

}

const getAllChat = async (userId) => {

    if (!userId){
        throw new CustomError("userId is required",400)
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new CustomError("User Not found", 404);
    }

    const chats = await Chat.find({ createdBy: userId },{__v:0})
        .sort({ createdAt: -1 }) 
        .lean();

    return chats;
}

const getChatById = async (chatId, userId) => {
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      throw new CustomError('Chat not found', 404);
    }
    
    if (chat.createdBy.toString() !== userId) {
      throw new CustomError('Unauthorized access to chat', 403);
    }
    
    return chat;
 
};


module.exports = {
    startChat,
    getAllChat,
    getChatById,
    sendPromptToExistingChat
}
