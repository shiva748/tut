const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
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
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = mongoose.model('User', schema);

module.exports = User;