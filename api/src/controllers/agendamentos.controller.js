const db = require("../config/database")

exports.agendar = async (req, res) => {
    const { data, horario, usuarios_id, barbeiros_id } = req.body
    const { rows } = await db.query(
        "INSERT INTO Agendamentos (data, horario, usuarios_id, barbeiros_id) values ($1, $2, $3, $4)",
        [data, horario, usuarios_id, barbeiros_id]
    )

    res.status(201).send({
        message: "Agendamento concluído",
    })

}

exports.getAgendamentos = async (req, res) => {
    const response = await db.query("SELECT data, horario, usuarios.nome as cliente, barbeiros.nome as barbeiro FROM agendamentos INNER JOIN barbeiros ON barbeiros.id = agendamentos.barbeiros_id INNER JOIN usuarios ON usuarios .id = agendamentos.usuarios_id WHERE data > NOW()");
    res.status(200).send(response.rows);
}