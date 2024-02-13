const Controllers = require('../Controllers/SpareParts')
const { ProtectByAuth } = require('../Controllers/User')
const router = require("express").Router()


router.get('/', Controllers.getAll)
    .post('/' ,ProtectByAuth, Controllers.post)
    .delete('/',ProtectByAuth, Controllers.delete)


module.exports = router