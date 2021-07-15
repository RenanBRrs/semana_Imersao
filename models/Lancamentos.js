const Sequelize = require('sequelize');
const db = require('./db');

const Lancamentos = db.define('lancamentos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  valor: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  }, //TIPO 1: PAGO / TIPO 2: PENDENTE
  tipo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }, //TIPO 1: PAGO / TIPO 2: PENDENTE
  situacao: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});
Lancamentos.sync();

module.exports = Lancamentos;
