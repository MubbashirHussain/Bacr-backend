const Controllers = require('../Controllers/Client')
const router = require("express").Router()

router.get('/', Controllers.getAll)
    .post('/', Controllers.post)
    .get('/:id', Controllers.getById)
    // .put('/:id', Controllers.put)
    .patch('/:id', Controllers.patch)
    .delete('/:id', Controllers.delete)


module.exports = router