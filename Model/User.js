const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    UserName: { type: String, unique: true, required: true },
    Password: { type: String, required: true }
}) 

let User = new mongoose.model("User" , UserSchema)
module.exports = User