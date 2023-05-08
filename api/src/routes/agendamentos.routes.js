const router = require('express-promise-router')()
const agendamentosController = require('../controllers/agendamentos.controller')
const auth = require('../middleware/auth')

router.post('/agendamentos', auth.verifyJWT, agendamentosController.agendar)
router.get('/agendamentos', auth.verifyJWT, agendamentosController.getAgendamentos)

module.exports = router