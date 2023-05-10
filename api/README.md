# Api

A conexão com o banco de dados é feita por uma API intermediadora.



#### Banco de dados
Para o banco de dados decidi ultilizar um servidor gratuito para hospeda-lo, usando o elephantsql eu consigo acessar o banco de qualquer lugar sem me preocupar com a compatibilidade do código em outras máquinas. A configuração do servidor está no arquivo /config/database.js

```sh
const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.on('connect', () => {
    console.log('Base de dados conectada com sucesso!')
})

module.exports ={
    query: (text, params) => pool.query(text, params),
}
```

Usando o express criei rotas para a comunicação entre o servidor e o frontend, cmo isso consigo fazer o uso de controllers para criar as consultas no bando de dados.

#### Autenticação

Usei o jwt para fazer a autenticação e proteção das rotas da minha api.

Dentro do controlador de usuários eu tenho uma função de login que verifica as infomrações do usuário e retorna um token caso as informações forem válidas
```
const token = jwt.sign(

    role: response.rows[0].roles_id, ##aqui eu guardo no token a role do usuário
    user_id: response.rows[0].id ##aqui eu guardo no token o id do usuário
    
}, "tokendeautorizacaoadmin", {expiresIn: 6000})

res.status(200).send({auth: true, token, role: response.rows[0].roles_id, user_id: response.rows[0].id})
```

Ao gerar o token com as infomações do usuário e a role eu consigo receber essas informações no front e decriptar elas diretamente, mantendo todas informações de risco seguras.


Para fazer está verificação eu uso um middleware que recebe o token e verifica se ele é valido, se sim ele retorna a função da rota
```

/middleware/auth.js

exports.verifyAdmin = (req, res, next) => {
    const token = req.headers['x-access-token']
    jwt.verify(token, 'tokendeautorizacaoadmin', (err, decoded) => {
        if(err) return res.status(401).end()

        req.username = decoded.username
        next()
    })
}



/routes/barbeiros.routes.js
router.get('/barbeiros', auth.verifyAdmin, barbeirosController.listarTodosBarbeiros)

```

Rota | Tipo | Objetivo
:---: | :---: | :---:
/barbeiros  | POST | Criar um barbeiro
/barbeiros  | GET | Busca todos os barbeiros
/barbeiros/:id | GET | Busca um barbeiro pelo id
/barbeiros/:id | DELETE | Deletar um barbeiro por id
| | |
/agendamentos | POST | Cria um agendamento
/agendamentos | GET | Retorna todos os agendementos futuros
/verificar | POST | Verificar se um agendamento é válido na data, hora e com o barbeiro selecionado
/agendamentoshoje | GET | Retorna todos os agendamentos de hoje
| | |
/barbeirosspec | POST | Adiciona uma especialidade para um barbeiro
/barbeirosspec/:id | GET | Retorna as especialidades do barbeiro por id
| | |
/especializacao | POST | Cria uma especialização
especializacao | GET | Retorna as especializações
| | |
/register | POST | Cria um usuário
/login | POST | Verifica as informações do usuário e retorna um token de autenticação




