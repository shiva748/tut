const jwt = require("jsonwebtoken");
const Users = require("../db/models/users");
const { handel_error } = require("../template/snippets");
exports.verifytoken = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        let {email} = await jwt.verify(token, "JLDvjslLJBDSKJVSD");
        let user = await Users.findOne({email});
        if(!user){
            handel_error("Invalid Token", 400);
        }
        req.user = user;
        next();
    } catch (error) {
        throw error;
    }
}