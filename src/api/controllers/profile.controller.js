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



module.exports = {
    getUserProfile,
}