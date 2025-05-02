const PacienteModel = require('../../models/mysql/pacienteModel');

async function countPacientes(req, res) {
  try {
    const totalPacientes = await PacienteModel.countPacientes();
    res.json({ totalPacientes });
  } catch (err) {
    res.status(500).json({ message: 'Error en la consulta', error: err.message });
  }
}

async function obtenerCategoriasPorEdad(req, res) {
  try {
    const resultado = await PacienteModel.getPacientesPorEdad();
    res.status(200).json({
      mensaje: 'Distribución por categorías de edad obtenida correctamente.',
      ...resultado
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
}

async function pacientesPorHabitacion(req, res) {
  try {
    const resultados = await HabitacionModel.getPacientesPorHabitacion();
    res.status(200).json({
      mensaje: 'Cantidad de pacientes por habitación obtenida correctamente.',
      datos: resultados
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
}

async function pacientesPorHabitacion(req, res) {
  try {
    const resultados = await PacienteModel.getPacientesPorHabitacion();
    res.status(200).json({
      mensaje: 'Cantidad de pacientes por habitación obtenida correctamente.',
      datos: resultados
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
}
async function pacientesPorGenero(req, res) {
  try {
    const resultados = await PacienteModel.getPacientesPorGenero();
    res.status(200).json({
      mensaje: 'Cantidad de pacientes agrupados por género obtenida correctamente.',
      datos: resultados
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
}
async function top5EdadesMasAtendidas(req, res) {
  try {
    const resultados = await PacienteModel.getTop5EdadesMasAtendidas();
    res.status(200).json({
      mensaje: 'Top 5 edades más atendidas obtenidas correctamente.',
      datos: resultados
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
}

async function top5EdadesMenosAtendidas(req, res) {
  try {
    const resultados = await PacienteModel.getTop5EdadesMenosAtendidas();
    res.status(200).json({
      mensaje: 'Top 5 edades menos atendidas obtenidas correctamente.',
      datos: resultados
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
}

async function top5HabitacionesMasUtilizadas(req, res) {
  try {
    const resultados = await PacienteModel.getTop5HabitacionesMasUtilizadas();
    res.status(200).json({
      mensaje: 'Top 5 habitaciones más utilizadas obtenidas correctamente.',
      datos: resultados
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
}

async function top5HabitacionesMenosUtilizadas(req, res) {
  try {
    const resultados = await PacienteModel.getTop5HabitacionesMenosUtilizadas();
    res.status(200).json({
      mensaje: 'Top 5 habitaciones menos utilizadas obtenidas correctamente.',
      datos: resultados
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
}

async function diaConMasPacientes(req, res) {
  try {
    const resultado = await PacienteModel.getDiaConMasPacientes();
    res.status(200).json({
      mensaje: 'Día con más pacientes obtenido correctamente.',
      datos: resultado
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
}

module.exports = {
  countPacientes,
  obtenerCategoriasPorEdad,
  pacientesPorHabitacion,
  pacientesPorGenero,
  top5EdadesMasAtendidas,
  top5EdadesMenosAtendidas,
  top5HabitacionesMasUtilizadas,
  top5HabitacionesMenosUtilizadas,
  diaConMasPacientes
};

