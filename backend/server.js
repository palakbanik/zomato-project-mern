// require app
const app = require("./src/app");
const connectDB = require("./src/db/db");

// port
const PORT = process.env.PORT || 3000;

// connect to database
connectDB();

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
