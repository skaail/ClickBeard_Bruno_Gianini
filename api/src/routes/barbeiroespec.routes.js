const router = require('express-promise-router')()
const barbeiroespecController = require('../controllers/barbeiroespec.controller')
const auth = require('../middleware/auth')

router.post('/barbeirosspec/', auth.verifyAdmin, barbeiroespecController.cadastrarEspecBarbeiro)

module.exports = router;