const profilService = require('../../services/profile')
const asyncErrorHandler = require('../../utils/asyncErrorHandler');

const getUserProfile = asyncErrorHandler(async(req,res,next)=>{
    const {userId} = req.params;
    const user =  await profilService.getUserProfile(userId)

    res.status(200).json({
        status:"success",
        data:{
            user
        }
    })
})

const updateUserProfile = asyncErrorHandler(async (req, res, next) => {
    const { userId } = req.params;
    const {
      age,
      gender,
      weight,
      height,
      bodyFat,
      activityLevel,
      workout,
      dietary,
      availableEquipment,
      timeAvailability
    } = req.body;

    const updateData = {};

    if (age) updateData["personalInfo.age"] = age;
    if (gender) updateData["personalInfo.gender"] = gender;
    
    if (weight) updateData["healthMetrics.weight"] = weight;
    if (height) updateData["healthMetrics.height"] = height;
    if (bodyFat) updateData["healthMetrics.bodyFat"] = bodyFat;
    if (activityLevel) updateData["healthMetrics.activityLevel"] = activityLevel;
    
    if (workout) updateData["preferences.workout"] = workout;
    if (dietary) updateData["preferences.dietary"] = dietary;
    if (availableEquipment) updateData["preferences.availableEquipment"] = availableEquipment;
    if (timeAvailability) updateData["preferences.timeAvailability"] = timeAvailability;

    const updatedUser = await profilService.updateUserProfile(userId, updateData);
    
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser
    });
  });

  



module.exports = {
    getUserProfile,
    updateUserProfile   
}