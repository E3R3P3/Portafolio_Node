const mysql = require('mysql2/promise');
const config = require('./connection');

async function connectToDatabase() {
    try {
        const pool = await mysql.createPool(config);
        console.log("Conexión exitosa a MySQL");
        return pool;
    } catch (err) {
        console.error("Error al conectar a MySQL:", err);
        throw err;
    }
};

module.exports = {
    connectToDatabase
};
