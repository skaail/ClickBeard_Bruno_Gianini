const app = require('./src/app')

const port = 3001

app.listen(port, ()  => {
    console.log('Api rodando na porta ' , port)
}) 