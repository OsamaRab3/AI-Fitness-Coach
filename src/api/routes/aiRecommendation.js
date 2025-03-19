const express = require('express')
const router = express.Router()
const aiPlan = require('../controllers/aiRecommendation.conotroller')


router.route('/:userId/workout-plan')
    .get(aiPlan.generateWorkoutPlan)

router.route('/:userId/nutrition-plan')
    .get(aiPlan.generateNutritionPlan)



router.route('/:userId/nutrition-plan/user')
    .get(aiPlan.getUserNutritionPlans)
module.exports = router;
