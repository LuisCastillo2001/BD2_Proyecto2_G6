const express = require('express');
const router = express.Router();
const { countPacientes } = require('../../controllers/mongo/pacientesController');
const { getLogHabitacionById } = require('../../controllers/mongo/loghabitacionController');

router.get('/paciente', countPacientes);
router.get('/loghabitacion/:id', getLogHabitacionById);

module.exports = router;
