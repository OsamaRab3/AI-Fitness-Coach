const express = require('express')
const router = express.Router()
const exercisesController = require('../controllers/exercises.controller')

router.route('/:userId')
    .get(exercisesController.createExercise)


router.route('/:userId/user')
    .get(exercisesController.getUserExercises)


router.route('/:exerciseId/exercies')
    .get(exercisesController.getExerciseDetails)


module.exports = router;