const mongoose = require("mongoose")

let Schema = new mongoose.Schema({
        Name : {type :String , required : true},
        ImageUrl : {type :String , required : true},
})

let Certificate = mongoose.model("Certificate" , Schema)
module.exports = Certificate