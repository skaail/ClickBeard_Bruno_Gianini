const router = require('express-promise-router')()
const especializacaoController = require('../controllers/especializacao.controller')
const auth = require('../middleware/auth')

router.post('/especializacao', auth.verifyJWT, especializacaoController.createEspec)
router.get('/especializacao', auth.verifyJWT, especializacaoController.listarTodasEspecializa)

module.exports = router;