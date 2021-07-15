const express = require('express');
const { findAll } = require('./models/Lancamentos');
const app = express();

// const db = require('./models/db');
const Lancamentos = require('./models/Lancamentos');

app.use(express.json());

app.get('/listar', async (req, res) => {
  await Lancamentos.findAll({ order: [['id', 'DESC']] })
    .then(function (lancamentos) {
      return res.json({
        erro: false,
        lancamentos,
      });
    })
    .catch(function (err) {
      return res.json({
        erro: true,
        mensagem: err,
      });
    });
});

app.post('/cadastrar', async (req, res) => {
  await Lancamentos.create(req.body)
    .then(function () {
      return res.json({
        error: false,
        mensagem: 'Valor cadastrado com sucesso',
      });
    })
    .catch(function () {
      return res.status(400).json({
        erro: true,
        mensagem: 'Erro: Lançamento não cadastrado!!!',
      });
    });
});

app.listen(8081, function () {
  console.log('RODANDO: http://localhost:8081');
});
