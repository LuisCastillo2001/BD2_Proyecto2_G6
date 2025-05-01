const express = require("express");
const router = express.Router();
const {
  pacientesXcategoria,
  pacientesXhabitacion,
  pacientesXgenero,
  topEdadesAtendidas,
  topMenosAtendidos,
  topHabitacionesMasUsadas,
  topHabitacionesMenosUsadas,
  diasMaspacientes,
} = require("../../controllers/mongo/pacientesController");

router.get("/pacientes-categoria", pacientesXcategoria);
router.get("/pacientes-habitacion", pacientesXhabitacion);
router.get("/pacientes-genero", pacientesXgenero);
router.get("/top-edades-atendidas", topEdadesAtendidas);
router.get("/top-menos-atendidos", topMenosAtendidos);
router.get("/top-habitaciones-mas-usadas", topHabitacionesMasUsadas);
router.get("/top-habitaciones-menos-usadas", topHabitacionesMenosUsadas);
router.get("/dias-mas-pacientes", diasMaspacientes);

module.exports = router;
