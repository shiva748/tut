const validator = require("validator");
const { handel_error } = require("../template/snippets")
const User = require("../db/models/users")
const bcrypt = require("bcrypt");
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

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            handel_error("All fields are required", 400);
        } else if (!validator.isEmail(email)) {
            handel_error("Please enter a valid email", 400);
        } else if (!validator.isStrongPassword(password)) {
            handel_error("Please enter a strong password", 400);
        }
        let user = await User.findOne({ email });
        if (!user) {
            handel_error("no User found", 400);
        }
        let compare = await bcrypt.compare(password, user.password);
        if (compare) {
            let token = await user.genrate_auth(user);
            res.status(200).cookie("token", token, { expires: new Date(Date.now() + 14 * 86400000) }).json({ result: true, message: "credentials are valid" });
        } else {
            handel_error("Please enter a valid password", 400);
        }

    } catch (error) {
        res.status(error.status).json({ result: false, message: error.message })
    }
}