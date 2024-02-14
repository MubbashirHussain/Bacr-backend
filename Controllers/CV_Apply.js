const CVApply = require('../Model/CV_Apply');
const { SendResponse } = require('../Helpers/HelperFx');
const cloudinary = require("cloudinary").v2;

const Controllers = {
    getAll: async (req, res) => {
        try {
            let Data = await CVApply.find({})
            if (!Data) return res.status(404).send(SendResponse(false, 'Data Not found'))
            res.send(Data)
        } catch (err) {
            res.send(err)
        }
    },
    getById: async (req, res) => {
        try {
            let id = req.params.id
            let Data = await CVApply.findById(id)
            if (!Data) return res
                .status(400)
                .send(SendResponse(false, "No Data found on This id", id));
            res.send(Data)
        } catch (err) {
            res.send(err)
        }
    },
    post: async (req, res) => {
        try {
            let { Team, ApplyingFor, FullName } = req.body
            let File = req.files.CV;
            let AllowedArry = ["ManagementTeam", "HVACRTeam", "ServiceTeam"]
            let Allowed = AllowedArry.findIndex((Name) => Name === Team)
            let ErrArray = []
            if (!Team) ErrArray.push("Team Is Required");
            if (!ApplyingFor) ErrArray.push("ApplyingFor Is Required");
            if (!FullName) ErrArray.push("FullName Is Required");
            if (Allowed < 0) ErrArray.push(`${Team} Is Not Valid Value`);
            if (!File) ErrArray.push("CV File Is Required");
            if (ErrArray.length > 0) {
                return res
                    .status(400)
                    .send(SendResponse(false, "There is Some  Error", ErrArray));
            }
            cloudinary.uploader.upload(File.tempFilePath, async function (err, result) {
                if (err) {
                    return res
                        .status(400)
                        .send(SendResponse(false, "File Not Upload", err));
                }
                if (result) {
                    let Data = await new CVApply({ Team, ApplyingFor, FullName, CV_Url: result.secure_url })
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
    delete: async (req, res) => {
        try {
            let id = req.params.id
            let Data = await CVApply.findById(id)
            if (!Data) return res
                .status(400)
                .send(SendResponse(false, "No Data found on This id", id));
            let Url = Data.CV_Url
            const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];
            if (!Url)
                return res
                    .status(400)
                    .send(SendResponse(false, "File No Found", Url));
            cloudinary.uploader.destroy(getPublicId(Url), async function (err, result) {
                if (err) {
                    res.status(400).send(SendResponse(false, "File Not Delete yet", err));
                }
                let data = await CVApply.findByIdAndDelete(id);
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