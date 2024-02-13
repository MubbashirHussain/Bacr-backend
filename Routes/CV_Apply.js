const Controllers = require('../Controllers/CV_Apply')
const { ProtectByAuth } = require('../Controllers/User')
const router = require("express").Router()


router.get('/', ProtectByAuth, Controllers.getAll)
    .get('/:id', ProtectByAuth, Controllers.getById)
    .post('/', ProtectByAuth, Controllers.post)
    .delete('/:id', ProtectByAuth, Controllers.delete)
module.exports = router