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

exports.verficarData = async (req, res) => {
    const { data, hora, id, usuarios_id } = req.body
    const response = await db.query("SELECT * FROM AGENDAMENTOS where data = $1 and horario = $2 and barbeiros_id = $3", [data, hora, id])
    if(response.rows.length === 0){
        const { rows } = await db.query(
            "INSERT INTO Agendamentos (data, horario, usuarios_id, barbeiros_id) values ($1, $2, $3, $4)",
            [data, hora, usuarios_id, id]
        )
        res.status(201).send({
            message: "Agendamento concluído",
        })
    }else{
        res.status(500).send({message: 'Horário indisponível'});
    }
    
}