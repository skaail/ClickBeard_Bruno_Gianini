const db = require("../config/database")

exports.cadastrarEspecBarbeiro = async (req, res) => {
    const { especialidades_id, barbeiros_id } = req.body
    const { rows } = await db.query(
        "INSERT INTO Barbeiros_Especialidades (especialidades_id, barbeiros_id) VALUES ($1, $2)",
        [especialidades_id, barbeiros_id]
    )

    res.status(201).send({
        message: "Especialidade adicionada com sucesso"
    })

}