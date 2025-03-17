
const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require('../config/index');

const genertPrompt = async (prompt) => {
    try {
        const genAI = new GoogleGenerativeAI(config.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text(); 


        return responseText;
    } catch (error) {
        console.error("Error generating AI response:", error);
        return "An error occurred while generating the workout plan.";
    }
};


module.exports = genertPrompt;