const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategoriController');

// CREATE: Menambahkan data ke dalam tabel kategoris
router.post('/api/v1/kategori/', kategoriController.create);

// READ: Menampilkan atau mengambil semua data dari tabel kategoris
router.get('/api/v1/kategori/', kategoriController.findAll);

// READ: Mengambil data berdasarkan id
router.get('/api/v1/kategori/:id', kategoriController.findOne);

// UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params 
router.put('/api/v1/kategori/:id', kategoriController.update);

// DELETE: Menghapus data sesuai id yang dikirimkan
router.delete('/api/v1/kategori/:id', kategoriController.delete);

module.exports = router;