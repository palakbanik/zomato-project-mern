const mongoose = require("mongoose");

// connect to database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error("DB connection Error:", err.message);
        process.exit(1);
    }
};

// export connectDB
module.exports = connectDB;
