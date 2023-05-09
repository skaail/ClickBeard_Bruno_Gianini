const router = require('express-promise-router')()
const barbeiroespecController = require('../controllers/barbeiroespec.controller')
const auth = require('../middleware/auth')

router.post('/barbeirosspec/', auth.verifyAdmin, barbeiroespecController.cadastrarEspecBarbeiro)
router.get('/barbeirosspec/:id', auth.verifyAdmin, barbeiroespecController.findBarbeiroByEspec)

module.exports = router;