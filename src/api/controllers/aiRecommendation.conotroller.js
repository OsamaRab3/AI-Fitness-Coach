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

const getUserNutritionPlans = asyncErrorHandler(async (req, res) => {
    const { userId } = req.params; 
    
    const plans = await aiRecommendationServices.getNutritionUserPlan (userId);
    
    res.status(200).json({
      status:"success" ,
      data: plans
    });
  });


  

module.exports = {
    generateWorkoutPlan,
    generateNutritionPlan,
    getUserNutritionPlans
}