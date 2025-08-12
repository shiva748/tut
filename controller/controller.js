const validator = require("validator");
const { handel_error } = require("../template/snippets")
const User = require("../db/models/users")
exports.get = (req, res) => {
    res.send('Welcome to the CarDekho API');
}

exports.register = async (req, res) => {
    try {
        const { name, email, phoneNo, password } = req.body;
        if (!name || !validator.isLength(name, { min: 3, max: 30 })) {
            handel_error("Please enter your name", 400);
        } else if (!email || !validator.isEmail(email)) {
            handel_error("Please enter a valid email", 400);
        } else if (!phoneNo || !validator.isMobilePhone(phoneNo, "en-IN")) {
            handel_error("Please enter a valid indian phone number", 400);
        } else if (!password || !validator.isStrongPassword(password, {})) {
            handel_error("Please enter a strong password", 400);
        }
        const user = new User({ name, email, phoneNo, password });
        await user.save();
        return res.status(201).json({ result: true, message: "User registred successfully" })
    } catch (error) {
        res.status(error.status || 400).json({ result: false, message: error.message })
    }
}