const { connectMongo } = require('../../db/mongo/connection');

/**
 * Esta función obtiene la cantidad de pacientes por categoría
 * (Pediátrico, Mediana edad, Geriátrico) y devuelve un arreglo
 */
async function pacientesXcategoria(req, res) {
  try {
    const inicio = Date.now();
    const db = await connectMongo();
    const result = await db.collection('PACIENTE').aggregate([
      {
        $project: {
          categoria: {
            $switch: {
              branches: [
                { case: { $lt: ["$edad", 18] }, then: "Pediátrico" },
                { case: { $and: [ { $gte: ["$edad", 18] }, { $lt: ["$edad", 61] } ] }, then: "Mediana edad" },
                { case: { $gte: ["$edad", 61] }, then: "Geriátrico" }
              ],
              default: "Edad desconocida"
            }
          }
        }
      },
      {
        $group: {
          _id: "$categoria",
          totalPacientes: { $sum: 1 }
        }
      },
      {
        $sort: { totalPacientes: -1 }
      }
    ]).toArray();
    const elapsedMs = Date.now() - inicio; 
    res.status(200).json({ resultado: result, tiempo: elapsedMs + ' ms' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
}

/*
 * Esta función obtiene la cantidad de pacientes por habitación
 * y devuelve un arreglo con el id de la habitación y la cantidad de pacientes
*/
async function pacientesXhabitacion(req, res) {
  try {
    const inicio = Date.now();
    const db = await connectMongo();
    const result = await db.collection('LOG_ACTIVIDAD').aggregate([
      // Agrupamos por idHabitacion y contamos pacientes únicos
      {
        $group: {
          _id: "$idHabitacion",
          pacientesUnicos: { $addToSet: "$idPaciente" }
        }
      },
      // Hacemos el JOIN (lookup) a la colección HABITACION
      {
        $lookup: {
          from: "HABITACION",
          localField: "_id",
          foreignField: "idHabitacion",
          as: "habitacionInfo"
        }
      },
      // Desenrollamos el resultado para acceder directamente
      { $unwind: "$habitacionInfo" },
      // Proyectamos el resultado final
      {
        $project: {
          _id: 0,
          idHabitacion: "$_id",
          Habitacion: "$habitacionInfo.habitacion",
          totalPacientes: { $size: "$pacientesUnicos" }
        }
      },
      {
        $sort: {idHabitacion: 1}
      }
    ]).toArray();
    const elapsedMs = Date.now() - inicio;
    res.status(200).json({ resultado: result, tiempo: elapsedMs + ' ms' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
}

/*
 * Esta función obtiene la cantidad de pacientes por género
 * y devuelve un arreglo con el género y la cantidad de pacientes
*/
async function pacientesXgenero(req, res) {
  const inicio = Date.now();
  try {
    const db = await connectMongo();
    const result = await db.collection('PACIENTE').aggregate([
      {
        $group: {
          _id: "$genero",
          totalPacientes: { $sum: 1 }
        }
      },
      {
        $sort: { totalPacientes: -1 }
      }
    ]).toArray();
    const elapsedMs = Date.now() - inicio;
    res.status(200).json({ resultado: result, tiempo: elapsedMs + ' ms' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
}

/*
 * Esta función obtiene las 5 edades más atendidas
 * y devuelve un arreglo con la edad y la cantidad de pacientes
*/
async function topEdadesAtendidas(req, res) {
  const inicio = Date.now();
  try {
    const db = await connectMongo();
    const result = await db.collection('PACIENTE').aggregate([
      {
        $group: {
          _id: "$edad",
          cantidad: { $sum: 1 }
        }
      },
      { $sort: { cantidad: -1 } },  // Ordenar de mayor a menor
      { $limit: 5 }                 // Solo los top 5
    ]).toArray();
    const elapsedMs = Date.now() - inicio;
    res.status(200).json({ resultado: result, tiempo: elapsedMs + ' ms' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
}

/*
 * Esta función obtiene las 5 edades menos atendidas
 * y devuelve un arreglo con la edad y la cantidad de pacientes
*/
async function topMenosAtendidos(req, res) {
  const inicio = Date.now();
  try {
    const db = await connectMongo();
    const result = await db.collection('PACIENTE').aggregate([
      {
        $group: {
          _id: "$edad",
          cantidad: { $sum: 1 }
        }
      },
      { $sort: { cantidad: 1 } },  // Ordenar de menor a mayor
      { $limit: 5 }                // Solo los top 5
    ]).toArray();
    const elapsedMs = Date.now() - inicio;
    res.status(200).json({ resultado: result, tiempo: elapsedMs + ' ms' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
}

/*
 * Esta función obtiene las 5 habitaciones más usadas
 * y devuelve un arreglo con la habitación y el total de pacientes
*/
async function topHabitacionesMasUsadas(req, res) {
  const inicio = Date.now();
  try {
    const db = await connectMongo();
    const result = await db.collection('LOG_ACTIVIDAD').aggregate([
      {
        $group: {
          _id: "$idHabitacion",
          pacientesUnicos: { $sum: 1 }
        }
      },
      // Hacemos el JOIN (lookup) a la colección HABITACION
      {
        $lookup: {
          from: "HABITACION",
          localField: "_id",
          foreignField: "idHabitacion",
          as: "habitacionInfo"
        }
      },
      // Desenrollamos el resultado para acceder directamente
      { $unwind: "$habitacionInfo" },
      // Proyectamos el resultado final
      {
        $project: {
          _id: 0,
          idHabitacion: "$_id",
          Habitacion: "$habitacionInfo.habitacion",
          totalPacientes: "$pacientesUnicos"
        }
      },
      { $sort: { totalPacientes: -1 } },
      { $limit: 5 }
    ]).toArray();
    const elapsedMs = Date.now() - inicio;
    res.status(200).json({ resultado: result, tiempo: elapsedMs + ' ms' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
}

/*
  * Esta función obtiene las 5 habitaciones menos usadas
  * y devuelve un arreglo con la habitación y el total de pacientes
*/
async function topHabitacionesMenosUsadas(req, res) {
  const inicio = Date.now();
  try {
    const db = await connectMongo();
    const result = await db.collection('LOG_ACTIVIDAD').aggregate([
      {
        $group: {
          _id: "$idHabitacion",
          pacientesUnicos: { $sum: 1 }
        }
      },
      // Hacemos el JOIN (lookup) a la colección HABITACION
      {
        $lookup: {
          from: "HABITACION",
          localField: "_id",
          foreignField: "idHabitacion",
          as: "habitacionInfo"
        }
      },
      // Desenrollamos el resultado para acceder directamente
      { $unwind: "$habitacionInfo" },
      // Proyectamos el resultado final
      {
        $project: {
          _id: 0,
          idHabitacion: "$_id",
          Habitacion: "$habitacionInfo.habitacion",
          totalPacientes: "$pacientesUnicos"
        }
      },
      { $sort: { totalPacientes: 1 } },
      { $limit: 5 }
    ]).toArray();
    const elapsedMs = Date.now() - inicio;
    res.status(200).json({ resultado: result, tiempo: elapsedMs + ' ms' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
}

async function diasMaspacientes(req, res) {
  const inicio = Date.now();
  try {
    const db = await connectMongo();
    const result = await db.collection('LOG_ACTIVIDAD').aggregate([
      {
        $project: {
          idPaciente: 1,
          fecha: { $dateToString: { format: "%m/%d/%Y", date: { $toDate: "$timestamp" } } }
        }
      },
      {
        $group: {
          _id: "$fecha",
          pacientesUnicos: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          fecha: "$_id",
          totalPacientes: "$pacientesUnicos"
        }
      },
      { $sort: { totalPacientes: -1 } },  // Días con más pacientes primero
      { $limit: 5 }                        // Top 5 si quieres limitar
    ]).toArray();
    const elapsedMs = Date.now() - inicio;
    res.status(200).json({ resultado: result, tiempo: elapsedMs + ' ms' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }  
}

module.exports = {
  pacientesXcategoria,
  pacientesXhabitacion,
  pacientesXgenero,
  topEdadesAtendidas,
  topMenosAtendidos,
  topHabitacionesMasUsadas,
  topHabitacionesMenosUsadas,
  diasMaspacientes
};
