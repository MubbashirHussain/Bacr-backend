const Controllers = require('../Controllers/SpareParts')
const router = require("express").Router()


router.get('/', Controllers.getAll)
    .post('/', Controllers.post)
    .delete('/', Controllers.delete)


module.exports = router