const express = require('express');
const router = express.Router();
const { connectDB } = require('../db/mongo');

const mongoRoutes = require('./mongo/mongo_routes');
const mysqlRoutes = require('./mysql/mysql_routes');

// Aquí puedes importar y usar otros routers, por ejemplo:
// const usersRouter = require('./users');
// router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ message: 'API Base Route' });
});

router.get('/pacientes', async (req, res) => {
  try {
    const db = await connectDB();
    const count = await db.collection('Paciente').countDocuments();
    res.json({ totalPacientes: count });
  } catch (err) {
    res.status(500).json({ message: 'Error en la consulta', error: err.message });
  }
});

router.use('/mongo', mongoRoutes);
router.use('/mysql', mysqlRoutes);

module.exports = router;