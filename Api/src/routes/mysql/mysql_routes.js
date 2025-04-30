const express = require('express');
const router = express.Router();
const { countPacientes } = require('../../controllers/mysql/pacientesController');

router.get('/paciente', countPacientes);

module.exports = router;
