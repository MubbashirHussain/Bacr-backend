const mongoose = require("mongoose")

let Schema = new mongoose.Schema({
        Team : {type :String ,  enum: ["ManagementTeam", "HVACRTeam" , "ServiceTeam"] , required : true},
        ApplyingFor : {type :String  , required : true},
        FullName : {type :String , required : true},
        CV_Url : {type :String , required : true},
})

let CV_Apply = mongoose.model("CVApply" , Schema)
module.exports = CV_Apply