const express = require('express');
const app = express();

app.get('/listar', (req, res) => {
  res.send('Extrato financeiro!');
});

app.listen(8081, function () {
  console.log('RODANDO: http://localhost:8081');
});
