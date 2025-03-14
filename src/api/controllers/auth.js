// login , signup 
const authService = require('../../services/auth');
const asyncErrorHandler = require('../../utils/asyncErrorHandler')

const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);

    res.status(200).json({
        data: {
            status: "success",
            user,
            token
        }
    })

})


const signup = asyncErrorHandler(async (req, res, next) => {
    const { name, email, password,gender ,age} = req.body;

    const {user,token} = await authService.signup(name, email, password,gender,age)

    res.status(201).json({
        data: {
            status: "success",
            user,
            token
        }
    })


})


module.exports = {
    login,
    signup
}

