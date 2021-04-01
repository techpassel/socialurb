import asyncHandler from 'express-async-handler';
import generateToken from '../utils/tokenUtil.js'
import User from '../models/userModel.js';

const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password, isAdmin  = false} = req.body;
    // console.log(name, email, password, isAdmin);
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        isAdmin
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const publicMethod = (req, res) => {
    res.send("Public route accessed successfully without authentication also.")
}

export {
    authenticateUser,
    registerUser,
    publicMethod
}