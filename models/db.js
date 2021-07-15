const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('celke', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(function () {
    console.log('Conexao realizada com sucesso!!!');
  })
  .catch(function (err) {
    console.log('Error: ' + err);
  });

module.exports = sequelize;
