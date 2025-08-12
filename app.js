require('dotenv').config();
const express = require('express');
const app = express();

// Import database connection
require('./db/conn');

app.use(express.json())

app.use("/api", require('./Routes/route'));


app.listen(3000, (err) => {
    if (err) {
        console.log("Error starting server:", err);
    } else {
        console.log("Server is running on port 3000");
    }
})
