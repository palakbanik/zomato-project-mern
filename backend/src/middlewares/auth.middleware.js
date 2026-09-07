const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    // check if token not exists
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Please login first.",
        });
    }

    try {
        // check the token is real or not
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findOne(decoded.id);

        res.foodPartner = foodPartner;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}
