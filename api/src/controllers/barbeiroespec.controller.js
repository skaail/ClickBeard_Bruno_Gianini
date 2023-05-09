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

exports.findBarbeiroByEspec = async (req, res) => {
    const barbeiroId = parseInt(req.params.id)
    const response = await db.query("SELECT Barbeiros.nome, Barbeiros.id FROM Barbeiros_Especialidades INNER JOIN barbeiros on barbeiros.id = Barbeiros_Especialidades.barbeiros_id INNER JOIN especialidades on especialidades.id = Barbeiros_Especialidades.especialidades_id WHERE especialidades_id = $1", [barbeiroId])
    res.status(200).send(response.rows)
}