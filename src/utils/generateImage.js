

const {GoogleGenerativeAI} = require("@google/generative-ai")
const fs = require("fs");
const config = require('../config/index');
const path = require('path')

const genAI = new GoogleGenerativeAI(config.API_KEY);
const IMAGE_FOLDER = "exercise-images";

async function generateExerciseImage(exerciseName, description, targetMuscles) {
  if (!fs.existsSync(IMAGE_FOLDER)) {
    fs.mkdirSync(IMAGE_FOLDER);
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      responseModalities: ['Text', 'Image']
    },
  });

  const prompt = `
    Generate a clear, instructional image showing a person performing the exercise: "${exerciseName}".
    The exercise works these muscles: ${targetMuscles.join(', ')}.
    Exercise description: ${description}
    Style: Clean, professional fitness illustration with proper form highlighted.
    Background: Simple, non-distracting gym or home setting.
    Do not include text overlays or watermarks.
  `;

  try {
    const response = await model.generateContent(prompt);
    const filename = `exercise-${exerciseName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
    const filePath = path.join(IMAGE_FOLDER, filename);
    
    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync(filePath, buffer);
        return filename;
      }
    }
    throw new Error("No image data found in the response");
  } catch (error) {
    console.error("Error generating exercise image:", error);
    return null;
  }
}


module.exports = {generateExerciseImage};
