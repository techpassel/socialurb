import asyncHandler from 'express-async-handler';
import generateToken from '../utils/tokenUtil.js'
import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import { UserTypes } from '../constants/modelConstants.js';
import { AuthResponse } from '../dto/authResponse.js';

const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json(new AuthResponse(user._id, user.firstName, user.lastName, user.email, user.imageUrl, generateToken(user._id)));
    } else {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error(!user? 'Invalid Email':'Wrong Password');
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, userType = UserTypes.USER } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Email already in use');
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        userType
    });

    if (user) {
        res.status(StatusCodes.CREATED).json(new AuthResponse(user._id, user.firstName, user.lastName, user.email, user.imageUrl, generateToken(user._id)));
    } else {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Invalid user data');
    }
});

export {
    authenticateUser,
    registerUser
}