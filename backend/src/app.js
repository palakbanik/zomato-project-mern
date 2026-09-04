// create server
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");

// instance
const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// auth routes
app.use("/api/auth", authRoutes);

// export app
module.exports = app;
