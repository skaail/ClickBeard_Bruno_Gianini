const router = require('express-promise-router')()
const agendamentosController = require('../controllers/agendamentos.controller')
const auth = require('../middleware/auth')

router.post('/agendamentos', auth.verifyAdmin, agendamentosController.agendar)
router.get('/agendamentos', auth.verifyAdmin, agendamentosController.getAgendamentos)
router.post('/verificar', auth.verifyAdmin, agendamentosController.verficarData)
router.get('/agendamentoshoje', auth.verifyAdmin, agendamentosController.getAgendamentosToday)

module.exports = router