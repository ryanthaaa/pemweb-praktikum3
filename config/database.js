const mysql = require('mysql2')
require('dotenv').config()

// Konfigurasi Port Koneksi
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    passwrod: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// export pool dengan interface promise agar dapat menggunakan async/await
module.exports = pool.promise();