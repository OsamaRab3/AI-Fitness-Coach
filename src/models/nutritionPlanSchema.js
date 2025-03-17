// // Nutrition Plan Schema
const mongoose = require('mongoose')



const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  weightLogs: [{
    weight: Number,
    date: Date
  }],
  measurements: [{
    bodyPart: String,
    value: Number,
    date: Date
  }],
  workoutCompletions: [{
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
    date: Date,
    duration: Number
  }],
  achievements: [{
    name: String,
    date: Date,
    description: String
  }]
});


const nutritionPlanSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
  dailyTargets: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number
  },
  meals: [{
    day: Number,
    mealType: String,
    recipes: [{
      name: String,
      ingredients: [String],
      nutrition: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fats: Number
      }
    }]
  }],
  // supplements: [{
  //   name: String,
  //   dosage: String,
  //   timing: String
  // }]
});


module.exports=mongoose.model('Nutrition',nutritionPlanSchema)