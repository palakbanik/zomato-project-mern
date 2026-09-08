// create server
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");

// instance
const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// auth routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

// export app
module.exports = app;
