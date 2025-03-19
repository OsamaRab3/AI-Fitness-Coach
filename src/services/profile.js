
const CustomError = require('../utils/CustomError')
const User = require('../models/userSchema')
const mongoose = require('mongoose')
const getUserProfile = async (userId) => {

    if (!userId) {
        throw new CustomError('UserId are required', 400);
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new CustomError('Invalid user ID format', 400);
    }

    const user = await User.findOne({ _id: userId }, { auth: 0, __v: 0, }).lean()

    if (!user) {
        throw new CustomError('User not found', 404);
    }

    return user;

}

const getUSerById = async (userId)=>{

    if (!userId) {
        throw new CustomError('UserId are required', 400);
    }
    const userExists = await User.exists({ _id: userId })
    return !!userExists ;
}




const isProfileComplete = async (userId) => {
    if (!userId) {
      throw new CustomError("User Id is required", 400);
    }
  
    const user = await User.findById(userId,{__v:0});
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const requiredFields = {
      personalInfo: ['name', 'email', 'gender', 'age'],
      healthMetrics: ['weight', 'height'],
      preferences: ['workout', 'dietary', 'timeAvailability'],
      fitnessGoals: true
    };
  
    const missingFields = [];

    requiredFields.personalInfo.forEach(field => {
      if (!user.personalInfo[field]) {
        missingFields.push(`personalInfo.${field}`);
      }
    });

    requiredFields.healthMetrics.forEach(field => {
      if (!user.healthMetrics[field]) {
        missingFields.push(`healthMetrics.${field}`);
      }
    });
   
    requiredFields.preferences.forEach(field => {
      if (!user.preferences[field] || 
          (Array.isArray(user.preferences[field]) && user.preferences[field].length === 0)) {
        missingFields.push(`preferences.${field}`);
      }
    });
  

    if (requiredFields.fitnessGoals && (!user.fitnessGoals || user.fitnessGoals.length === 0)) {
      missingFields.push('fitnessGoals');
    }
  
  
    return {
      isComplete: missingFields.length === 0,
      missingFields
    };
  };
  


const updateUserProfile = async(userId,updateData) =>{
   const user =  await getUSerById(userId)
   if (!user){
    throw new CustomError("User not found",404)
   }
   const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true },
  );


  

  updatedUser.updatedAt = Date.now();
  await updatedUser.save();

  const userAfterUpdate = await User.findById(
    userId,
    { auth: 0, __v: 0 ,createdAt:0,updatedAt:0}
  );
  
  return userAfterUpdate;


}

module.exports = {
    getUserProfile,
    updateUserProfile,
    getUSerById,
    isProfileComplete

}