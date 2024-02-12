const Controllers = require('../Controllers/Inventory')
const router = require("express").Router()
router.get('/', Controllers.getAll)
    .get('/:id', Controllers.getById)
    .post('/', Controllers.post)
    // .put('/:id', Controllers.put)
    .patch('/:id', Controllers.patch)
    .delete('/:id', Controllers.delete)


module.exports = router