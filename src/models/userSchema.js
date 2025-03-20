const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    email: { type: String, unique: true, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other']},
    age: { type: Number },
    imageProfile: {
      type: String,
      default: 'avatar.png'
    }
  },
  fitnessGoals: {
    type: [{
      goalType: { type: String },
      target: mongoose.Schema.Types.Mixed,
      deadline: Date
    }]},
  //   default: [
  //     {
  //       goalType: "weight",
  //       target: 70,
  //       deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) 
  //     }
  //   ]
  // },
  healthMetrics: {
    weight: { type: Number},
    height: { type: Number },
    bodyFat: Number,
    bmi: Number,
    activityLevel: { type: String, enum: ['Sedentary', 'Lightly active', 'Moderately active', 'Very active'], default: 'Moderately active' }
  },
  preferences: {
    workout: [String],
    dietary: [String],
    availableEquipment: [String],
    timeAvailability: { type: Number, min: 10, max: 180 }
  },
  progress: {
    workoutHistory: [{ date: Date, exercises: [String] }],
    nutritionHistory: [{ date: Date, meals: [String] }],
    weightProgress: [{ date: Date, weight: Number }]
  },
  auth: {
    password: { type: String, required: true },

  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
