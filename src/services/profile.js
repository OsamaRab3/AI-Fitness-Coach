
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


module.exports = {
    getUserProfile,

}
// Update user profile
// async function updateUserProfile(userId, updateData)
// // Upload profile picture
// async function uploadProfilePicture(userId, imageFile)
// // Get user metrics
// async function getUserMetrics(userId)
// // Update user metrics
// async function updateUserMetrics(userId, metricsData)
// // Delete user account
// async function deleteUserAccount(userId)