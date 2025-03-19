

const { getUserProfile, getUSerById } = require('./profile')
const genertPrompt = require('../utils/genertPrompt');
const CustomError = require('../utils/CustomError');
const Exercise = require('../models/exerciseSchema')
const { generateExerciseImage } = require('../utils/generateImage');
const upload = require('../utils');

const getUserExercises = async (userId) => {

  const user = await getUSerById(userId);
  if (!user) {
    throw new CustomError("User Not Found", 404);
  }

  const exercises = await Exercise.find({ createdBy: userId }, { __v: 0 });

  return exercises;
};


const getExerciseDetails = async (exerciseId) => {

  const details = await Exercise.findById(exerciseId, { __v: 0 });

  if (!details) {
    throw new CustomError("Exercise Not Found", 404);
  }

  return details;


}


const createExercise = async (userId) => {
  const user = await getUserProfile(userId);
  if (!user) throw new CustomError("User not found", 404);


  if (!user.healthMetrics?.weight || !user.preferences?.availableEquipment) {
    throw new CustomError("Please complete your profile", 400);
  }

  const prompt = `
    Create a collection of personalized exercises in JSON format matching this structure:
    
    [
      {
        "name": "Exercise Name",
        "description": "Detailed description of how to perform the exercise correctly",
        "targetMuscles": ["Primary muscle", "Secondary muscle"],
        "difficulty": "beginner|intermediate|advanced",
        "caloriesBurned": 150,
        "duration": 45,
        "equipment": ["Required equipment"],
        "variations": [
          {
            "name": "Variation Name",
            "description": "How to perform this variation"
          }
        ],
        "tips": ["Form tip 1", "Form tip 2"],
        "contraindications": ["Health condition to be cautious about"]
      }
    ]

    Requirements:
    - Generate 4 exercises total
    - personalInfo: ${user.personalInfo.age} years old, ${user.personalInfo.gender}
    - Activity level: ${user.healthMetrics.activityLevel || "Moderately active"}
    - Weight: ${user.healthMetrics.weight} kg
    - Available equipment: ${user.preferences.availableEquipment.join(', ')}
    - Workout preferences: ${user.preferences.workout?.join(', ') || "General fitness"}
    - Include a mix of cardio, strength, flexibility and balance exercises
    - Include exercises for all major muscle groups
    - Include at least 2 exercises that require no equipment
    - Tailor difficulty level to user's activity level
    - Include detailed form descriptions to prevent injury
    - Include calorie estimates based on user's weight
    - For each exercise, list any contraindications based on common health issues
    - Return only valid JSON array, no markdown
  `;

  const response = await genertPrompt(prompt);
  const cleanedPlan = response.replace(/```json/g, '').replace(/```/g, '').trim();
  let parsedPlan = JSON.parse(cleanedPlan);
  
  const exercisePromises = parsedPlan.map(async (exercise) => {
    const imagePath = await generateExerciseImage(
      exercise.name,
      exercise.description,
      exercise.targetMuscles
    );

    let image = imagePath ? await upload(imagePath) : null;


    return {
      ...exercise,
      image,
      createdBy: userId,
      equipment: exercise.equipment || []
    };
  });



  const exercisesWithImages = await Promise.all(exercisePromises);
  const savedExercises = await Exercise.insertMany(exercisesWithImages);


  return savedExercises;

};



module.exports = {
  createExercise,
  getUserExercises,
  getExerciseDetails
}
