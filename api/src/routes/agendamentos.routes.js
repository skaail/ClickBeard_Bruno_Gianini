const router = require('express-promise-router')()
const agendamentosController = require('../controllers/agendamentos.controller')
const auth = require('../middleware/auth')

router.post('/agendamentos', auth.verifyAdmin, agendamentosController.agendar)
router.get('/agendamentos', auth.verifyAdmin, agendamentosController.getAgendamentos)

module.exports = router