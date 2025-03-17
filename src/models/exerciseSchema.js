
const mongoose = require('mongoose')
const exerciseSchema = new mongoose.Schema({
  name: String,
  description: String,
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  targetMuscles: [String],
  equipment: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image:String,
  tips: { type: [String], default: [] },
  caloriesBurned: { type: Number, required: true },
  duration: { type: Number, required: true },

},
{ timestamps: true });




module.exports = mongoose.model('Exercise',exerciseSchema);
