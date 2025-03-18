const { getUserProfile } = require('./profile');
const CustomError = require('../utils/CustomError');
const Exercise = require('../models/exerciseSchema')
const WorkoutPlan = require('../models/workoutPlanSchema')
const genertPrompt = require('../utils/genertPrompt')
const NutritionPlan = require('../models/nutritionPlanSchema')


const generateWorkoutPlan = async (userId) => {
  const user = await getUserProfile(userId);
  if (!user) throw new CustomError("User not found", 404);


  const prompt = `
    Create a personalized workout plan in JSON format matching this structure:
    
    {
      "name": "Custom Workout Plan",
      "difficulty": "beginner|intermediate|advanced",
      "targetMuscles": ["muscle1", "muscle2"],
      "exercises": [
        {
          "exercise": {
            "name": "Exercise Name",
            "description": "Brief description",
            "targetMuscles": ["muscle1", "muscle2"],
            "equipment": ["equipment1"],
            "demoVideo": "URL or null",
            "difficulty": "beginner"
          },
          "sets": 3,
          "reps": 12,
          "duration": 45
        }
      ],
      "schedule": [
        {
          "day": "Monday",
          "exercises": [
            {
              "exercise": "Exercise Name", // Reference by name
              "sets": 3,
              "reps": 10
            }
          ]
        }
      ]
    }

    Requirements:
    - Include 7-day schedule
    - Alternate muscle groups each day
    - personalInfo:${user.personalInfo.age} , ${user.personalInfo.gender}
    - Difficulty level: ${user.healthMetrics.activityLevel}
    - Available equipment: ${user.preferences.availableEquipment?.join(', ') || 'none'}
    - Fitness goals: ${user.fitnessGoals?.map(g => g.goalType).join(', ') || 'general fitness'}
    - Include warm-up and cool-down routines as exercises
    - Follow exercise schema format
    - Return only valid JSON, no markdown
  `;

  const workoutPlan = await genertPrompt(prompt);

  const cleanedPlan = workoutPlan.replace(/```json/g, '').replace(/```/g, '').trim();
  let parsedPlan;

  parsedPlan = JSON.parse(cleanedPlan);

  return parsedPlan;
};


const saveWorkoutPlan = async (userId) => {
  const generatedPlan = await generateWorkoutPlan(userId);
  console.log("generated workoutplan is: ",generatedPlan)

  // const exerciseNames = new Set();


  // generatedPlan.exercises.forEach(exerciseData => {
  //   exerciseNames.add(exerciseData.exercise.name);
  // });


  // generatedPlan.schedule.forEach(daySchedule => {
  //   daySchedule.exercises.forEach(scheduleExercise => {
  //     exerciseNames.add(scheduleExercise.exercise);
  //   });
  // });


  // const exerciseNameArray = Array.from(exerciseNames);
  // const existingExercises = await Exercise.find({ name: { $in: exerciseNameArray } });


  // const exerciseMap = {};
  // existingExercises.forEach(exercise => {
  //   exerciseMap[exercise.name] = exercise._id;
  // });


  const workoutPlan = new WorkoutPlan({
    name: generatedPlan.name,
    exercises: generatedPlan.exercises.map(exerciseData => ({
      exercise:exerciseData.name ,
      sets: exerciseData.sets,
      reps: exerciseData.reps,
      duration: exerciseData.duration
    })),
    schedule: generatedPlan.schedule.map(daySchedule => ({
      day: daySchedule.day,
      exercises: daySchedule.exercises.map(scheduleExercise => ({
        exercise:scheduleExercise.name,
        sets: scheduleExercise.sets,
        reps: scheduleExercise.reps
      }))
    })),
    difficulty: generatedPlan.difficulty,
    targetMuscles: generatedPlan.targetMuscles,
    createdBy: userId,
  });

  try {
    const savedPlan = await workoutPlan.save();
    return savedPlan;
  } catch (error) {
    throw new CustomError(`Failed to save workout plan: ${error.message}`, 500);
  }
};



const generateNutritionPlan = async (userId) => {
  const user = await getUserProfile(userId);
  if (!user) throw new CustomError("User not found", 404);


  const prompt = `
    Create a personalized nutrition plan in JSON format matching this structure:
    Just send me Json file
    
    {
      "name": "Custom Nutrition Plan",
      "meals": [
        {
          "mealType": "Breakfast",
          "recipes": [
            {
              "name": "Recipe Name",
              "ingredients": ["list", "of", "ingredients"],
              "portionSize": "g/ml",
              "calories": number,
              "macros": {
                "protein": "Xg",
                "carbs": "Yg", 
                "fats": "Zg"
              }
            }
          ]
        }
      ],
      "dailyTargets": {
        "calories": number,
        "protein": "Xg",
        "carbs": "Yg",
        "fats": "Zg"
      },
      "hydration": {
        "dailyWater": "X liters",
        "timingRecommendations": ["string"]
      },
      "supplements": [
        {
          "name": "Supplement Name",
          "dosage": "X mg",
          "timing": "Morning/Evening"
        }
      ]
    }
    
    Additional requirements:
    - Include 7-day meal plan with 3 meals per day (breakfast, lunch, dinner)
    - Use metric measurements (grams, milliliters)
    - personalInfo: ${user.personalInfo.age}  ${user.personalInfo.gender}
    - Avoid: ${user.preferences.dietaryRestrictions?.join(', ') || 'common allergens'}
    - Focus on: ${user.preferences.dietaryPreferences?.join(', ') || 'balanced diet'}
    - Cooking tips for each recipe
    - Just send a Json format don't add any addtion data
    `;
  const nutritionPlan = await genertPrompt(prompt);
  const cleanedPlan = nutritionPlan.replace(/```json/g, '').replace(/```/g, '').trim();
  let parsedPlan;
  parsedPlan = JSON.parse(cleanedPlan);
  return parsedPlan;
};



const saveNutritionPlan = async (userId) => {

  const generatedPlan = await generateNutritionPlan(userId);


  const nutritionPlan = new NutritionPlan({
    name: generatedPlan.name,
    user: userId,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    dailyTargets: {
      calories: parseInt(generatedPlan.dailyTargets.calories),
      protein: parseInt(generatedPlan.dailyTargets.protein),
      carbs: parseInt(generatedPlan.dailyTargets.carbs),
      fats: parseInt(generatedPlan.dailyTargets.fats)
    },
    meals: [],
  });


  const days = [1, 2, 3, 4, 5, 6, 7];
  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  generatedPlan.meals.forEach(meal => {
    days.forEach(day => {
      nutritionPlan.meals.push({
        day: day,
        mealType: meal.mealType,
        recipes: meal.recipes.map(recipe => ({
          name: recipe.name,
          ingredients: recipe.ingredients,
          nutrition: {
            calories: parseInt(recipe.calories),
            protein: parseInt(recipe.macros.protein),
            carbs: parseInt(recipe.macros.carbs),
            fats: parseInt(recipe.macros.fats)
          }
        }))
      });
    });
  });


  try {
    const savedPlan = await nutritionPlan.save();
    return savedPlan;
  } catch (error) {
    throw new CustomError(`Failed to save nutrition plan: ${error.message}`, 500);
  }
};




module.exports = { generateWorkoutPlan, generateNutritionPlan, saveNutritionPlan, saveWorkoutPlan };
