const mongoose = require("mongoose")

let Schema = new mongoose.Schema({
        Name : {type :String , required : true},
        ImageUrl : {type :String , required : true},
})

let Client = mongoose.model("Client" , Schema)
module.exports = Client