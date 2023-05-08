const router = require('express-promise-router')()
const usersController = require('../controllers/users.controller')

router.post('/register', usersController.criarUsuário)
router.post('/login', usersController.login)

module.exports = router