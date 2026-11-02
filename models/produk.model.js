const db = require('../config/database')

const ProdukModel = {
    // Ambil seluruh data produk secara Async
    getAll: async () => {
        // db.query mengembalikan array: [rows, fields]
        const [rows] = await db.query('SELECT * FROM produk ORDER BY id DESC')
        return rows;
    },

    // Mengambil record spesifik berdasarkan Primary Key (id)
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM produk WHERE id = ?', [id])
        return rows[0]
    },

    // Simpan data produk baru dengan Prepared Statement
    create: async (data) => {
        const sql = `INSERT INTO produk (nama_produk, kategori, harga, stok) VALUES (?, ?, ?, ?)`

        // Eksekusi query dnegan parameter array terurut sesuai letak placeholder '?'
        const [result] = await db.query(sql, [
            data.nama_produk,
            data.kategori,
            data.harga,
            data.stok
        ]);

        return result
    },

    // Memperbaharui record produk berdasarkan id
    update: async (id, data) => {
        const sql = `UPDATE produk SET nama_produk = ?, kategori = ?, harga = ?, stok = ? WHERE id = ?`

        const [result] = await db.query(sql, [
            data.nama_produk,
            data.kategori,
            data.harga,
            data.stok,
            id
        ])

        return result;
    },

    // Hapus data produk
    delete: async (id) => {
        const sql = `DELETE FROM produk WHERE id = ?`
        const [result] = await db.query(sql, [id])
        return result;
    },

    // METODE TIDAK AMAN UNTUK EKSPERIMEN KEAMANAN LABORATORIUM 
    getByKategoriInsecure: async (kategoriInput) => {
        // Konkatenasi langsung (SANGAT RENTAN!)
        const rawSql = `SELECT * FROM produk WHERE kategori = '${kategoriInput}'`;
        console.log('\n[RAW VULNERABLE SQL QUERY]:', rawSql);
        const [rows] = await db.query(rawSql);
        return rows; 
    },

    // METODE AMAN MENGGUNAKAN PREPARED STATEMENT 
    getByKategoriSecure: async (kategoriInput) => {
        const secureSql = 'SELECT * FROM produk WHERE kategori = ?';
        console.log('\n[PREPARED STATEMENT QUERY]:', secureSql, 'WITH VALUE:', [kategoriInput]);
        const [rows] = await db.query(secureSql, [kategoriInput]);
        return rows; 
    }

}

module.exports = ProdukModel;