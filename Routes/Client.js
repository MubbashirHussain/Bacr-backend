const Controllers = require('../Controllers/Client')
const { ProtectByAuth } = require('../Controllers/User')
const router = require("express").Router()

router.get('/', Controllers.getAll)
    .get('/:id', Controllers.getById)
    .post('/', ProtectByAuth, Controllers.post)
    // .put('/:id', Controllers.put)
    .patch('/:id', ProtectByAuth, Controllers.patch)
    .delete('/:id', ProtectByAuth, Controllers.delete)


module.exports = router