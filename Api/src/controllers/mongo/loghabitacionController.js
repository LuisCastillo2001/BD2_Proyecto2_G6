const { connectMongo } = require('../../db/mongo/connection');

async function getLogHabitacionById(req, res) {
  try {
    const db = await connectMongo();
    const idHabitacion = parseInt(req.params.id, 10);
    const result = await db.collection('logHabitacion').find({ idHabitacion }).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error en la consulta', error: err.message });
  }
}

module.exports = {
  getLogHabitacionById
};
