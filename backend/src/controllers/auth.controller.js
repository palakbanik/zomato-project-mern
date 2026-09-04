const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
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

// logout user by clearing the token
function logoutUser(req, res) {
    try {
        res.clearCookie("token");

        res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Logout failed",
        });
    }
}

// register food partner
async function registerFoodPartner(req, res) {
    // destructure
    const { name, email, password } = req.body;

    // check if food partner is exists
    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });
    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food partner account already exists.",
        });
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create food partner account
    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
    });

    // generate JWT token
    const token = jwt.sign(
        {
            id: foodPartner._id,
        },
        process.env.JWT_SECRET,
    );

    // set token
    res.cookie("token", token);

    // send response
    res.status(201).json({
        message: "Food partner register successfully.",
        foodPartner: {
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
        },
    });
}

async function loginFoodPartner(req, res) {
    // destructure
    const { email, password } = req.body;

    // check food partner exists or not
    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    // check password exists
    const isPasswordValid = await bcrypt.compare(
        password,
        foodPartner.password,
    );
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    // generate JWT token
    const token = jwt.sign(
        {
            id: foodPartner._id,
        },
        process.env.JWT_SECRET,
    );

    // set token
    res.cookie("token", token);

    // send response
    res.status(200).json({
        message: "Food partner logged in successfully.",
        foodPartner: {
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
        },
    });
}

// logout food partner by clearing the token
function logoutFoodPartner(req, res) {
    try {
        res.clearCookie("token");

        res.status(200).json({
            message: "Food Partner logged out successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Logout failed",
        });
    }
}

// export multiple controllers
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
};
