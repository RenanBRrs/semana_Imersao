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
  }, //TIPO 1: PAGO / TIPO 2: PENDENTE / TIPO 3: RECEBIDO
  situacao: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  dataPagamento: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
Lancamentos.sync();
// Lancamentos.sync({ alter: true });

module.exports = Lancamentos;
