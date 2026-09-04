const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register user
async function registerUser(req, res) {
    try {
        // destructure the request body
        const { fullName, email, password } = req.body;

        // check if user already exists
        const isUserAlreadyExists = await userModel.findOne({ email });
        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
        });

        // generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
        );

        // set cookie
        res.cookie("token", token);

        // send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({
            message: "Error occurred while registering user",
        });
    }
}

// login user
async function loginUser(req, res) {
    try {
        // destructure the request body
        const { email, password } = req.body;

        // find user by email
        const user = await userModel.findOne({ email });

        // check if user not exists
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password!",
            });
        }

        // check by comparing password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password!",
            });
        }

        // generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
        );

        // set cookie
        res.cookie("token", token);

        // send response
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({
            message: "Error occurred while logging in user",
        });
    }
}

// export multiple controllers
module.exports = {
    registerUser,
    loginUser,
};
