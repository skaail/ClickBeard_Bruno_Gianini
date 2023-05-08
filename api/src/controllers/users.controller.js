const db = require('../config/database')
const jwt = require('jsonwebtoken')

exports.criarUsuário = async (req, res) => {
    const { email, username, password, role } = req.body

    const response = await db.query(
        "SELECT * FROM USUARIOS WHERE email = $1",
        [email]
    )

    if(response.rowCount < 0){
        const { rows } = await db.query(
            "INSERT INTO USUARIOS (email, username, senha, role) VALUES ($1, $2, $3, $4)",
            [email, username, password, role]
        )
    
        res.status(201).send({
            message: "Usuário adicionado com sucesso",
            body: {
                usuário: {email, role}
            }
        })
    }else{
        res.status(500).send({message: "Email já cadastrado"})
    }



}

exports.login = async (req, res) => {
    const { email, password } = req.body

    const response = await db.query(
        "SELECT * FROM USUARIOS WHERE email = $1 and senha = $2",
        [email, password]
    )

    if(response.rowCount > 0){
        const token = jwt.sign({role: response.rows[0].roles_id}, "tokendeautorizacaoadmin", {expiresIn: 6000})
        res.status(200).send({auth: true, token, role: response.rows[0].roles_id})
    }else{
        res.status(500).send({message: "Credenciais não encontradas"})
    }
}


