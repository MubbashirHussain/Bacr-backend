const Client = require('../Model/Client');
const { SendResponse } = require('../Helpers/HelperFx');
const cloudinary = require("cloudinary").v2;


const Controllers = {
    getAll: async (req, res) => {
        try {
            let Data = await Client.find({})
            if (!Data) return res.status(404).send(SendResponse(false, 'Data Not found'))
            res.send(Data)
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    getById: async (req, res) => {
        try {
            let id = req.params.id
            let Data = await Client.findById(id)
            if (!Data) return res.status(400)
                .send(SendResponse(false, "No Data found on This id", id));
            res.send(Data)
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    post: async (req, res) => {
        try {
            let { Name } = req.body
            let File = req.files.Image;
            let ErrArray = []
            if (!Name) ErrArray.push("Name Is Required");
            if (!File) ErrArray.push("Image File Is Required");
            if (ErrArray.length > 0) {
                return res
                    .status(400)
                    .send(SendResponse(false, "There is Some  Error", ErrArray));
            }
            cloudinary.uploader.upload(File.tempFilePath,{folder: "Bacr/Client",}, async function (err, result) {
                if (err) {
                    return res
                        .status(400)
                        .send(SendResponse(false, "File Not Upload", err));
                }
                if (result) {
                    let Data = await new Client({ Name , ImageUrl: result.secure_url })
                    console.log(Data)
                    let Save = await Data.save().then(() =>
                        res.status(201).send(
                            SendResponse(true, "Appliction Successfully Uploaded", Data))
                    ).catch(() =>
                        res.status(400)
                            .send(SendResponse(false, "", Data.errors))
                    );
                }
            });
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    put: async (req, res) => {
        try {
            let { Name } = req.body
            let id = req.params.id
            let Data = await Client.findOneAndReplace({ _id: id }, { Name }, { returnDocument: "after" })
            res.send(Data)
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    patch: async (req, res) => {
        try {
            let { Name } = req.body
            let id = req.params.id
            let Data = await Client.findByIdAndUpdate(id,{Name}, { returnDocument: "after" })
            res.send(Data)
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id
            let Data = await Client.findById(id)
            if (!Data) return res
                .status(400)
                .send(SendResponse(false, "No Data found on This id", id));
            let Url = Data.ImageUrl
            const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];
            if (!Url)
                return res
                    .status(400)
                    .send(SendResponse(false, "File No Found", Url));
            cloudinary.uploader.destroy(getPublicId(Url), async function (err, result) {
                if (err) {
                    res.status(400).send(SendResponse(false, "File Not Delete yet", err));
                }
                let data = await Client.findByIdAndDelete(id);
                res.status(200)
                    .send(
                        SendResponse(true, "Data successfully Deleted", { ...data._doc })
                    );
            });
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
}
module.exports = Controllers