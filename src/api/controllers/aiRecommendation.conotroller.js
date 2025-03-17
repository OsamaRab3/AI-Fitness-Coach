const aiRecommendationServices = require('../../services/aiRecommendation')
const asyncErrorHandler = require('../../utils/asyncErrorHandler');

const generateWorkoutPlan = asyncErrorHandler(async(req,res,next)=>{
    const { userId } = req.params;

    const plan = await aiRecommendationServices.saveWorkoutPlan(userId);

    res.status(201).json({
        status:"success",
        data:{
            plan
        }
    })
})


const generateNutritionPlan = asyncErrorHandler(async(req,res,next)=>{
    const { userId } = req.params;
    const plan =  await aiRecommendationServices.saveNutritionPlan(userId)

    res.status(201).json({
        status:"success",
        data:{
            plan
        }
    })

})



module.exports = {
    generateWorkoutPlan,
    generateNutritionPlan
}