const express = require('express');
const router = express.Router();
const { countPacientes, obtenerCategoriasPorEdad, pacientesPorHabitacion, pacientesPorGenero, top5EdadesMasAtendidas, top5EdadesMenosAtendidas, top5HabitacionesMasUtilizadas, top5HabitacionesMenosUtilizadas, diaConMasPacientes } = require('../../controllers/mysql/pacientesController');

router.get('/paciente', countPacientes);
router.get('/paciente/por-edad', obtenerCategoriasPorEdad)
router.get('/paciente/por-habitacion', pacientesPorHabitacion)
router.get('/paciente/por-genero',pacientesPorGenero)
router.get('/paciente/edad-mas-atendido',top5EdadesMasAtendidas)
router.get('/paciente/edad-menos-atendido',top5EdadesMenosAtendidas)
router.get('/paciente/habitacion-mas-utilizada',top5HabitacionesMasUtilizadas)
router.get('/paciente/habitacion-menos-utilizada',top5HabitacionesMenosUtilizadas)
router.get('/paciente/dia-mas-paciente',diaConMasPacientes)



module.exports = router;
