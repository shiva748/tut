const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phoneNo: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    sessions: [{
        token: {
            type: String,
            require: true
        },
        expiry: {
            type: Date,
            require: true
        }
    }]
});

schema.pre("save", async function hash(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

schema.methods.genrate_auth = async function () {
    try {
        let token = jwt.sign({ email: this.email }, "JLDvjslLJBDSKJVSD", { expiresIn: "14 days" })
        this.sessions.push({ token, expiry: new Date(new Date().getTime() + 14 * 86400000) })
        await this.save();
        return token;
    } catch (error) {
        console.log("error genrating a token");
        throw error
    }
}
const User = mongoose.model('User', schema);

module.exports = User;