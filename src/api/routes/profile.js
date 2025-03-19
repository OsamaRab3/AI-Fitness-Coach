const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile.controller')



router.route('/:userId')
    .get(profileController.getUserProfile)
    .patch(profileController.updateUserProfile)

router.route('/:userId/completion')
    .get(profileController.getProfileCompletionStatus)


module.exports = router;