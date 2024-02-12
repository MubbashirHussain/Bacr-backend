const Spareparts = require('../Model/SpareParts');
const { SendResponse } = require('../Helpers/HelperFx');
const cloudinary = require("cloudinary").v2;

const Controllers = {
    getAll: async (req, res) => {
        try {
            let Data = await Spareparts.find({})
            if (!Data) return res.status(404).send(SendResponse(false, 'Data Not found'))
            res.send(Data)
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    post: async (req, res) => {
        try {
            let { Data } = req.body
            if (!Data) return res
                .status(400)
                .send(SendResponse(false, "There is Some  Error", Data));

            let Kk = await Spareparts.deleteMany({});
            let SP = new Spareparts({ Data }).save()
            res.status(201).send(
                SendResponse(true, "Data Successfully Uploaded", SP))
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id
            let Data = await Spareparts.deleteMany({})
            res.send(SendResponse(true , "Data Successfully Deleted" ,Data))
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
}
module.exports = Controllers