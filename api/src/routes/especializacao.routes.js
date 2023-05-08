const router = require('express-promise-router')()
const especializacaoController = require('../controllers/especializacao.controller')
const auth = require('../middleware/auth')

router.post('/especializacao', auth.verifyAdmin, especializacaoController.createEspec)
router.get('/especializacao', auth.verifyAdmin, especializacaoController.listarTodasEspecializa)

module.exports = router;