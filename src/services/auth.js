const User = require('../models/userSchema');
const CustomError = require('../utils/CustomError');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken')

const login = async (email, password) => {
    if (!email || !password) {
        throw new CustomError('Email and password are required', 400);
    }
    const user = await User.findOne({ 'personalInfo.email': email }, {
        __v: 0
        , fitnessGoals: 0,
        healthMetrics: 0,
        preferences: 0,
        createdAt: 0,
        updatedAt: 0
    }).select('+auth.password').lean();;

    if (!user) {
        throw new CustomError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.auth.password);

    if (!isMatch) {
        throw new CustomError('Invalid credentials', 401);
    }
    const token = generateToken(user._id)

    delete user.auth;
    return { user, token };


};

const signup = async (name, email, password) => {

    if (!name || !email || !password ) {
        throw new CustomError('Name, email and password are required', 400);
    }


    const existingUser = await User.findOne({ 'personalInfo.email': email });
    if (existingUser) {
        throw new CustomError('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        personalInfo: {
            name,
            email
        },
        auth: {
            password: hashedPassword
        }


    });

    const token = generateToken(newUser._id);
    const user = await User.findById(newUser._id, {
        __v: 0,
        auth: 0,
        progress:0,
        fitnessGoals: 0,
        healthMetrics: 0,
        preferences: 0,
        createdAt: 0,
        updatedAt: 0
    }).lean();



    return { user, token };

};


module.exports = {
    login,
    signup
};