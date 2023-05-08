const db = require("../config/database")

exports.createEspec = async (req, res) => {
    const { nome } = req.body
    const { rows } = await db.query(
        "INSERT INTO Especialidades (nome) values ($1)",
        [nome]
    )

    res.status(201).send({
        message: "Especialidade adicionada com sucesso",
    })

}

exports.listarTodasEspecializa = async (req, res) => {
    const response = await db.query("SELECT id as value, nome as label FROM Especialidades");
    res.status(200).send(response.rows);
}