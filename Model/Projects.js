const mongoose = require("mongoose")
let Schema = new mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String },
    ImageUrl: { type: String, required: true },
    Category: { type: String, enum: ["National", "Overseas"] },
})

let Projects = new mongoose.model("Projects", Schema)
module.exports = Projects