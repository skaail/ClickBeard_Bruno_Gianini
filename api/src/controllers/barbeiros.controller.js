const db = require("../config/database")

exports.createBarbeiro = async (req, res) => {
    const { nome, idade, dt_contratacao } = req.body
    const { rows } = await db.query(
        "INSERT INTO Barbeiros (nome, idade, dt_contratacao) VALUES ($1, $2, $3) RETURNING id",
        [nome, idade, dt_contratacao]
    )

    res.status(201).send({
        rows
    })

}

exports.listarTodosBarbeiros = async (req, res) => {
    const response = await db.query("SELECT Barbeiros.id, Barbeiros.nome as nome, Barbeiros.idade, Barbeiros.dt_contratacao, string_agg(Especialidades.nome , ', ') as especialidade FROM Barbeiros INNER JOIN Barbeiros_Especialidades ON Barbeiros.id = Barbeiros_Especialidades.Barbeiros_id INNER JOIN Especialidades ON Barbeiros_Especialidades.Especialidades_id = Especialidades.id GROUP BY Barbeiros.id, Barbeiros.nome, Barbeiros.idade, Barbeiros.dt_contratacao");
    res.status(200).send(response.rows);
}

exports.findBarbeirosById = async (req, res) => {
    const barbeiroId = parseInt(req.params.id)
    const response = await db.query("SELECT B.nome, B.idade, B.dt_contratacao, string_agg(Especialidades.nome , ', ') as especialidade FROM Barbeiros B INNER JOIN Barbeiros_Especialidades E ON B.id = E.Barbeiros_id WHERE B.id = $1 Group By B.nome, B.idade, B.dt_contratacao", [barbeiroId])
    res.status(200).send(response.rows)
}

exports.deleteBarbeiroById = async (req, res) => {
    const barbeiroId = parseInt(req.params.id)

    await db.query('DELETE FROM Barbeiros WHERE id = $1', [barbeiroId])

    res.status(200).send({ message: 'Barbeiro deletado com sucesso!', barbeiroId })

}