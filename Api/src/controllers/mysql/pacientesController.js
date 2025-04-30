const pool = require('../../db/mysql/connection');

async function countPacientes(req, res) {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS totalPacientes FROM Paciente');
    res.json({ totalPacientes: rows[0].totalPacientes });
  } catch (err) {
    res.status(500).json({ message: 'Error en la consulta', error: err.message });
  }
}

module.exports = { countPacientes };
