require('dotenv').config()
const express = require("express")
const App = express()
const cors = require("cors")
const projectsRouters = require('./Routes/Projects')
const InventoryRouter = require("./Routes/Inventory")
const CV_Route = require("./Routes/CV_Apply")
const CertificateRouters = require("./Routes/Certificate")
const ClientRouters = require("./Routes/Client")
const SparePartsRouters = require("./Routes/SpareParts")
const UserRouters = require("./Routes/User")
const { default: mongoose } = require("mongoose")
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_API,
});

App.get("/favicon.ico", (req, res) => res.status(204));
App.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

App.use(cors())
// App.use(express.urlencoded())
App.use(express.json())
App.use("/api/cv", CV_Route);
App.use('/api/Inventory', InventoryRouter)
App.use('/api/projects' , projectsRouters)
App.use('/api/SpareParts' , SparePartsRouters)
App.use('/api/Auth' , UserRouters)
App.use('/api/Client' , ClientRouters)
App.use('/api/Certificate' , CertificateRouters)


Main().catch((e) => console.log(e))
async function Main() {
   await mongoose.connect(process.env.MONGOURL)
    console.log("Dataase is Connected")
}
App.listen(process.env.PORT, () => { console.log("Server is Started At", process.env.PORT) })