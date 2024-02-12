const Projects = require('../Model/Projects');
const { SendResponse } = require('../Helpers/HelperFx');
const cloudinary = require("cloudinary").v2;

const Controllers = {
    getAll: async (req, res) => {
        try {
            let Data = await Projects.find({})
            if (!Data) return res.status(404).send(SendResponse(false, 'Data Not found'))
            res.send(Data)
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    getById: async (req, res) => {
        try {
            let id = req.params.id
            let Data = await Projects.findById(id)
            if (!Data) return res.status(400)
                .send(SendResponse(false, "No Data found on This id", id));
            res.send(Data)
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    post: async (req, res) => {
        try {
            let { Title, Description, Category } = req.body
            let File = req.files.Image;
            let AllowedArry = ["National", "Overseas"]
            let Allowed = AllowedArry.findIndex((Name) => Name === Category)
            let ErrArray = []
            if (Allowed < 0) ErrArray.push(`${Category} Is Not Valid Value ( 'National' ,  'Overseas' ) is Optional Values`);
            if (!Title) ErrArray.push("Title Is Required");
            if (!Description) ErrArray.push("Description Is Required");
            if (!Category) ErrArray.push("Category Is Required");
            if (!File) ErrArray.push("Image File Is Required");
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
                    let Data = await new Projects({ Title, Description, Category, ImageUrl: result.secure_url })
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
            let { Title, Description, Category , ImageUrl } = req.body
            let id = req.params.id
            let ErrArray = []
            let AllowedArry = ["National", "Overseas"]
            let Allowed = AllowedArry.findIndex((Name) => Name === Category)
            if (ErrArray.length > 0) {
                return res
                    .status(400)
                    .send(SendResponse(false, "There is Some  Error", ErrArray));
            }
            if (Allowed < 0) ErrArray.push(`${Category} Is Not Valid Value ( 'National' ,  'Overseas' ) is Optional Values`);
            let Data = await Projects.findOneAndReplace({ _id: id }, { Title, Description, Category ,ImageUrl}, { returnDocument: "after" })
            res.send(Data)
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    patch: async (req, res) => {
        try {
            let { Title, Description, Category } = req.body
            let id = req.params.id
            let ErrArray = []
            let AllowedArry = ["National", "Overseas"]
            let Allowed = AllowedArry.findIndex((Name) => Name === Category)
            if (ErrArray.length > 0) {
                return res
                    .status(400)
                    .send(SendResponse(false, "There is Some  Error", ErrArray));
            }
            if (Allowed < 0) ErrArray.push(`${Category} Is Not Valid Value ( 'National' ,  'Overseas' ) is Optional Values`);
            let Data = await Projects.findByIdAndUpdate(id, { Title, Description, Category }, { returnDocument: "after" })
            res.send(Data)
        } catch (err) {
            res.status(400).send(SendResponse(false, "Unknown Error", err));
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id
            let Data = await Projects.findById(id)
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
                let data = await Projects.findByIdAndDelete(id);
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