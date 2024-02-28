const { Pengeluaran } = require('../database/models');

const pengeluaranController = {
  // Menampilkan semua pengeluaran
  async getAll(req, res, next) {
    try {
      const pengeluarans = await Pengeluaran.findAll();
      res.json(pengeluarans);
    } catch (error) {
      next(error);
    }
  },

  // Menampilkan detail pengeluaran berdasarkan ID
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const pengeluaran = await Pengeluaran.findByPk(id);
      if (!pengeluaran) {
        return res.status(404).json({ error: 'Pengeluaran not found' });
      }
      res.json(pengeluaran);
    } catch (error) {
      next(error);
    }
  },

  // Menambahkan pengeluaran baru
  async create(req, res, next) {
    const { jumlah_pengeluaran, tanggal, jam, kategori_pengeluaran_id } = req.body;
    try {
      const newPengeluaran = await Pengeluaran.create({
        jumlah_pengeluaran,
        tanggal,
        jam,
        kategori_pengeluaran_id
      });
      res.status(201).json(newPengeluaran);
    } catch (error) {
      next(error);
    }
  },

  // Memperbarui pengeluaran berdasarkan ID
  async update(req, res, next) {
    const { id } = req.params;
    const { jumlah_pengeluaran, tanggal, jam, kategori_pengeluaran_id } = req.body;
    try {
      const pengeluaran = await Pengeluaran.findByPk(id);
      if (!pengeluaran) {
        return res.status(404).json({ error: 'Pengeluaran not found' });
      }
      await pengeluaran.update({
        jumlah_pengeluaran,
        tanggal,
        jam,
        kategori_pengeluaran_id
      });
      res.json(pengeluaran);
    } catch (error) {
      next(error);
    }
  },

  // Menghapus pengeluaran berdasarkan ID
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const pengeluaran = await Pengeluaran.findByPk(id);
      if (!pengeluaran) {
        return res.status(404).json({ error: 'Pengeluaran not found' });
      }
      await pengeluaran.destroy();
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = pengeluaranController;