const mongoose = require("mongoose")
let InventorySchema = new mongoose.Schema({
        Title : {type :String , required : true},
        Description : {type :String },
        ImageUrl : {type :String},
})

let Inventory = new mongoose.model("Inventory" , InventorySchema)
module.exports = Inventory