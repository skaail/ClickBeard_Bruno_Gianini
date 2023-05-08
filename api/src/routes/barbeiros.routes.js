const router = require('express-promise-router')()
const barbeirosController = require('../controllers/barbeiros.controller')
const auth = require('../middleware/auth')

router.post('/barbeiros', auth.verifyAdmin, barbeirosController.createBarbeiro)
router.get('/barbeiros', auth.verifyAdmin, barbeirosController.listarTodosBarbeiros)
router.get('/barbeiros/:id', auth.verifyAdmin, barbeirosController.findBarbeirosById)
router.delete('/barbeiros/:id', auth.verifyAdmin, barbeirosController.deleteBarbeiroById)

module.exports = router;