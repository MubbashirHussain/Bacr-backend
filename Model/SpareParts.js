const mongoose = require("mongoose")

let Schema = new mongoose.Schema({
        Data: { type: [], required: true },
}, { timestamps: true })

let SpareParts = mongoose.model("SparePart", Schema)
module.exports = SpareParts