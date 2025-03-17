const mongoose = require('mongoose')
const workoutPlanSchema = new mongoose.Schema({
  name: String,
  exercises: [{
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    sets: Number,
    reps: Number,
    duration: Number
  }],
  schedule: [{
    day: String,
    exercises: [{
      exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
      sets: Number,
      reps: Number
    }]
  }],
  difficulty: String,
  targetMuscles: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports =  mongoose.model('WorkoutPlan',workoutPlanSchema)