// create server
require("dotenv").config();
const express = require("express");

// instance
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// export app
module.exports = app;
