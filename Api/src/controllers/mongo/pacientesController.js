const { connectMongo } = require('../../db/mongo/connection');

async function countPacientes(req, res) {
  try {
    const db = await connectMongo();
    const count = await db.collection('Paciente').countDocuments();
    res.json({ totalPacientes: count });
  } catch (err) {
    res.status(500).json({ message: 'Error en la consulta', error: err.message });
  }
}

module.exports = {
  countPacientes
};
