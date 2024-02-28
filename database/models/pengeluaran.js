'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengeluaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pengeluaran.init({
    jumlah_pengeluaran: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    jam: DataTypes.TIME,
    kategori_pengeluaran_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pengeluaran',
  });
  return Pengeluaran;
};