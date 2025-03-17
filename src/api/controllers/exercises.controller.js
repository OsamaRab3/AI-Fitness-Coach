const exercisesServices = require("../../services/exercise")
const asyncErrorHandler = require("../../utils/asyncErrorHandler")

const createExercise = asyncErrorHandler(async(req,res,next)=>{
    const {userId} = req.params;

    const plan = await exercisesServices.createExercise(userId);

    res.status(201).json({
        status:'success',
        data:{
            plan    
        }
    })
})
const getUserExercises = asyncErrorHandler(async(req,res,next)=>{
    const {userId} = req.params;
    const exercises = await exercisesServices.getUserExercises(userId)

    res.status(200).json({
        status:'success',
        data:{
            exercises    
        }
    })

})
const getExerciseDetails = asyncErrorHandler(async(req,res,next)=>{
    const {exerciseId} = req.params;
    const details = await exercisesServices.getExerciseDetails(exerciseId);

    res.status(200).json({
        status:"success",
        data:{
            details
        }
    })
})

module.exports = {
    createExercise,
    getUserExercises,
    getExerciseDetails
}