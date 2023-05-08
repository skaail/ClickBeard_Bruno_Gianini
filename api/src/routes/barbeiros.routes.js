const router = require('express-promise-router')()
const barbeirosController = require('../controllers/barbeiros.controller')
const auth = require('../middleware/auth')

router.post('/barbeiros', auth.verifyJWT, barbeirosController.createBarbeiro)
router.get('/barbeiros', auth.verifyJWT, barbeirosController.listarTodosBarbeiros)
router.get('/barbeiros/:id', auth.verifyJWT, barbeirosController.findBarbeirosById)
router.delete('/barbeiros/:id', auth.verifyJWT, barbeirosController.deleteBarbeiroById)

module.exports = router;