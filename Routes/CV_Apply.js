const Controllers = require('../Controllers/CV_Apply')
const router = require("express").Router()


router.get('/', Controllers.getAll)
    .get('/:id', Controllers.getById)
    .post('/', Controllers.post)
    .delete('/:id', Controllers.delete)


module.exports = router