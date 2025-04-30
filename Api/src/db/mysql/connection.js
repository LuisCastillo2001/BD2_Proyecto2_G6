const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Luis2001', // Cambia esto según tu configuración
  database: 'clinica',
  port: 3306
});

module.exports = pool;
