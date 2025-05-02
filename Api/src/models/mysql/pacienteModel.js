const pool = require('../../db/mysql/connection');

exports.countPacientes = async () => {
  const start = process.hrtime();
  const [rows] = await pool.query('SELECT COUNT(*) AS totalPacientes FROM paciente');
  const end = process.hrtime(start);
  const tiempoRespuestaMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

  return {
    totalPacientes: rows[0].totalPacientes,
    tiempoRespuestaMs: `${tiempoRespuestaMs} ms`
  };
};

exports.getPacientesPorEdad = async () => {
  const start = process.hrtime();

  const [results] = await pool.query(`
    SELECT
      SUM(CASE WHEN edad < 18 THEN 1 ELSE 0 END) AS pediatrico,
      SUM(CASE WHEN edad BETWEEN 18 AND 60 THEN 1 ELSE 0 END) AS mediana_edad,
      SUM(CASE WHEN edad > 60 THEN 1 ELSE 0 END) AS geriatrico
    FROM PACIENTE;
  `);

  const end = process.hrtime(start);
  const tiempoRespuestaMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

  return {
    categorias: results[0],
    tiempoRespuestaMs: `${tiempoRespuestaMs} ms`
  };
};

exports.getPacientesPorHabitacion = async () => {
  const start = process.hrtime();

  const [results] = await pool.query(`
    SELECT 
      h.habitacion,
      COUNT(DISTINCT la.idPaciente) AS cantidadPacientes
    FROM 
      HABITACION h
    LEFT JOIN 
      LOG_ACTIVIDAD la ON h.idHabitacion = la.idHabitacion
    GROUP BY 
      h.habitacion;
  `);

  const end = process.hrtime(start);
  const tiempoRespuestaMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

  return {
    datos: results,
    tiempoRespuestaMs: `${tiempoRespuestaMs} ms`
  };
};

exports.getPacientesPorGenero = async () => {
  const start = process.hrtime();

  const [results] = await pool.query(`
    SELECT 
      genero,
      COUNT(*) AS cantidad
    FROM 
      PACIENTE
    GROUP BY 
      genero;
  `);

  const end = process.hrtime(start);
  const tiempoRespuestaMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

  return {
    datos: results,
    tiempoRespuestaMs: `${tiempoRespuestaMs} ms`
  };
};

exports.getTop5EdadesMasAtendidas = async () => {
  const start = process.hrtime();

  const [results] = await pool.query(`
    SELECT edad, COUNT(*) AS cantidad
    FROM PACIENTE
    GROUP BY edad
    ORDER BY cantidad DESC
    LIMIT 5;
  `);

  const end = process.hrtime(start);
  const tiempoRespuestaMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

  return {
    datos: results,
    tiempoRespuestaMs: `${tiempoRespuestaMs} ms`
  };
};

exports.getTop5EdadesMenosAtendidas = async () => {
  const start = process.hrtime();

  const [results] = await pool.query(`
    SELECT edad, COUNT(*) AS cantidad
    FROM PACIENTE
    GROUP BY edad
    ORDER BY cantidad ASC
    LIMIT 5;
  `);

  const end = process.hrtime(start);
  const tiempoRespuestaMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

  return {
    datos: results,
    tiempoRespuestaMs: `${tiempoRespuestaMs} ms`
  };
};

exports.getTop5HabitacionesMasUtilizadas = async () => {
  const start = process.hrtime();

  const [results] = await pool.query(`
    SELECT h.habitacion, COUNT(la.idPaciente) AS cantidadPacientes
    FROM HABITACION h
    LEFT JOIN LOG_ACTIVIDAD la ON h.idHabitacion = la.idHabitacion
    GROUP BY h.habitacion
    ORDER BY cantidadPacientes DESC
    LIMIT 5;
  `);

  const end = process.hrtime(start);
  const tiempoRespuestaMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

  return {
    datos: results,
    tiempoRespuestaMs: `${tiempoRespuestaMs} ms`
  };
};

exports.getTop5HabitacionesMenosUtilizadas = async () => {
  const start = process.hrtime();

  const [results] = await pool.query(`
    SELECT h.habitacion, COUNT(la.idPaciente) AS cantidadPacientes
    FROM HABITACION h
    LEFT JOIN LOG_ACTIVIDAD la ON h.idHabitacion = la.idHabitacion
    GROUP BY h.habitacion
    ORDER BY cantidadPacientes ASC
    LIMIT 5;
  `);

  const end = process.hrtime(start);
  const tiempoRespuestaMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

  return {
    datos: results,
    tiempoRespuestaMs: `${tiempoRespuestaMs} ms`
  };
};

exports.getDiaConMasPacientes = async () => {
    const start = process.hrtime();
  
    const [results] = await pool.query(`
      SELECT 
        DATE(STR_TO_DATE(timestamp, '%m/%d/%Y %r')) AS dia, 
        COUNT(DISTINCT idPaciente) AS cantidadPacientes
      FROM LOG_ACTIVIDAD
      GROUP BY dia
      ORDER BY cantidadPacientes DESC
      LIMIT 1;
    `);
  
    const end = process.hrtime(start);
    const tiempoRespuestaMs = (end[0] * 1000 + end[1] / 1e6).toFixed(2);
  
    return {
      datos: results[0],
      tiempoRespuestaMs: `${tiempoRespuestaMs} ms`
    };
  };
  
  
