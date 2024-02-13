const { SendResponse } = require('../Helpers/HelperFx')
let User = require('../Model/User')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let UserController = {
    Login: async (req, res) => {
        try {
            let { UserName, Password } = req.body
            let ErrArr = []
            if (!UserName) ErrArr.push("UserName is Required")
            if (!Password) ErrArr.push("Password is Required")
            if (Password < 6) ErrArr.push("Password Must be Greater than 6 digit")
            if (ErrArr.length > 0) return res.send(SendResponse(false, "", ErrArr))
            let UserExits = await User.findOne({ UserName })
            if (!UserExits) return res.status(400).send(SendResponse(false, "User Not Found"), { UserExitsr })
            let token = jwt.sign({ ...UserExits, Password: null }, process.env.SECRET_KEY)
            if (!token) return res.status(400).send(SendResponse(false, 'Token Not Found'))
            res.send(SendResponse(true, "User Successfully Login", { UserName, Token: token }))
        } catch (err) {
            res.send(SendResponse(false, "Catch Unknown Error", { ...err }))
        }
    },
    Signup: async (req, res) => {
        try {
            let { UserName, Password } = req.body
            let ErrArr = []
            if (!UserName) ErrArr.push("UserName is Required ")
            if (!Password) ErrArr.push("Password is Required ")
            if (Password < 6) ErrArr.push("Password Must be Greater than 6 digit")
            if (Password < 6) return res.send(SendResponse())
            let UserExits = await User.findOne({ UserName })
            if (UserExits) return res.send(SendResponse(false, "User Already Exits", { UserName }))
            let EnPassword = await bcrypt.hash(Password, 10)
            if (EnPassword) {
                let Response = await User({ UserName, Password: EnPassword }).save()
                res.send(SendResponse(true, "User Successfully Created", Response))
            }
        } catch (err) {
            res.send(SendResponse(false, "Catch Unknown Error", err))

        }
    },

    ProtectByAuth: async (req, res, Next) => {
        try {
            let token = req.get("Authorization")?.split("Bearer ")[1];
            let decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded._doc.UserName) {
                Next();
            } else {
                res
                    .status(407)
                    .send(SendResponse(false, "invalid Token", decoded ));
            }
        } catch (err) {
            res.status(407).send(SendResponse(false, "invalid Token Err", err ));
        }
    },
}
module.exports = UserController



