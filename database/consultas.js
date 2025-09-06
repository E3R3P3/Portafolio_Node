const mysql = require('mysql2/promise');
const config = require('./connection');

async function getUser (str) {
  let pool;
  //   console.log(`Fetching user data for: ${str}`)
  try {
    // Crear el pool de conexiones
    pool = await mysql.createPool(config)

    // Realizar la consulta con parámetros para evitar inyección SQL
    const [rows] = await pool.query('select * from users where name = ?', [str])
    console.log('[getUser] Rows fetched:', rows[0].name, rows[0].password)
    return [rows[0].name, rows[0].password] // Retorna las filas obtenidas
  } catch (err) {
    console.error('[getUser] SQL error', err.message)
    return false
  } finally {
    // Cerrar el pool para liberar recursos
    if (pool) await pool.end()
  };
};

async function registerUser (name, lastName, email, password, age, role) {
  let pool;
  try {
    // Crear el pool de conexiones
    pool = await mysql.createPool(config)
    console.log(`[registerUser] Registering user: ${name} ${lastName}, Email: ${email}, Age: ${age}, Role: ${role}`)
    // Realizar la inserción con parámetros para evitar inyección SQL
    const [result] = await pool.query('INSERT INTO users (name, lastName, email, password, age, role) VALUES (?, ?, ?, ?, ?, ?)', [name, lastName, email, password, age, role])
    console.log('[registerUser] User registered:', result.insertId)
    return result.insertId // Retorna el ID del nuevo usuario
  } catch (err) {
    console.error('[registerUser] SQL error', err.message)
    return false
  } finally {
    // Cerrar el pool para liberar recursos
    if (pool) await pool.end()
  };
};

module.exports = { getUser, registerUser };
