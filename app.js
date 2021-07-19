const express = require('express');
const { findAll } = require('./models/Lancamentos');
const app = express();
const { Op } = require('sequelize');

// const db = require('./models/db');
const Lancamentos = require('./models/Lancamentos');

app.use(express.json());

app.get('/listar/:mes/:ano', async (req, res) => {
  var mes = new Number(req.params.mes);
  var ano = new Number(req.params.ano);
  // console.log('Mes: ' + mes + ' Ano: ' + ano);

  const date = new Date(ano + '-' + mes);
  var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
  var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // console.log('Pimeiro dia do mes: ' + primeiroDia);
  // console.log('Ultimo dia do mes: ' + ultimoDia);

  const lancamentos = await Lancamentos.findAll({
    order: [['dataPagamento', 'ASC']],
    where: {
      dataPagamento: {
        [Op.between]: [primeiroDia, ultimoDia],
      },
    },
  });

  const valorPagamentos = await Lancamentos.sum('valor', {
    where: {
      tipo: '1',
      dataPagamento: {
        [Op.between]: [primeiroDia, ultimoDia],
      },
    },
  });

  const valorRecebido = await Lancamentos.sum('valor', {
    where: {
      tipo: '2',
      dataPagamento: {
        [Op.between]: [primeiroDia, ultimoDia],
      },
    },
  });

  const saldo = new Number(valorRecebido) - new Number(valorPagamentos);

  return res.json({
    erro: false,
    lancamentos,
    valorPagamentos,
    valorRecebido,
    saldo,
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
