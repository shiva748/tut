const mongoose = require('mongoose');

//mongodb://localhost:27017/cardekho

mongoose.connect(process.env.DB).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});
