const express = require('express')
const cors = require('cors')

const app = express()

const index = require('./routes/index')
const userRoute = require('./routes/users.routes')
const especializacaoRoute = require('./routes/especializacao.routes')
const barbeirosRoute = require('./routes/barbeiros.routes')
const agendamentosRoute = require('./routes/agendamentos.routes')
const barbeiroespecRoute = require('./routes/barbeiroespec.routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.json({ type: 'application/vnd.api+json' }))
app.use(cors())

app.use(index);
app.use('/api/', userRoute)
app.use('/api/', especializacaoRoute)
app.use('/api/', barbeirosRoute)
app.use('/api/', agendamentosRoute)
app.use('/api/', barbeiroespecRoute)

module.exports = app