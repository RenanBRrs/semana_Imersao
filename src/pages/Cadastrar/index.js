import React, { useState } from 'react';
import api from '../../config/configAPI';
import './styles.css';

export const Cadastrar = () => {
  const [lancamento, setLancamento] = useState({
    nome: '',
    valor: '',
    tipo: '',
    situacao: '',
    dataPagamento: '',
  });

  const [valorLancTarget, setValorLancTarget] = useState('');

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
  });

  const valorInput = (e) =>
    setLancamento({ ...lancamento, [e.target.name]: e.target.value });

  const valorLancamento = async (e) => {
    var valorLancamentoInput = e.target.value;
    // console.log(valorLancamento);

    valorLancamentoInput = valorLancamentoInput.replace(/\D/g, '');
    valorLancamentoInput = valorLancamentoInput.replace(
      /(\d)(\d{2})$/,
      '$1,$2',
    );
    valorLancamentoInput = valorLancamentoInput.replace(
      /(?=(\d{3})+(\D))\B/g,
      '.',
    );

    console.log(valorLancamentoInput);
    setValorLancTarget(valorLancamentoInput);

    var valorSalvar = await valorLancamentoInput.replace('.', '');
    valorSalvar = await valorSalvar.replace(',', '.');

    setLancamento({ ...lancamento, valor: valorSalvar });
  };

  const cadLancamento = async (e) => {
    e.preventDefault();

    console.log(lancamento.valor);

    const headers = {
      'Content-Type': 'application/json',
    };

    await api
      .post('/cadastrar', lancamento, { headers })
      .then((response) => {
        console.log(response);
        setStatus({
          type: 'success',
          mensagem: response.data.mensagem,
        });
        document.location.reload(true);
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            type: 'error',
            mensagem: err.response.data.mensagem,
          });
        } else {
          setStatus({
            type: 'error',
            mensagem: 'Erro: tente mais tarde!',
          });
        }
        console.log(err.response);
      });
  };

  return (
    <div id='cad'>
      <h1>Cadastrar</h1>

      {status.type === 'success' ? <p>{status.mensagem}</p> : ''}
      {status.type === 'error' ? <p>{status.mensagem}</p> : ''}

      <form onSubmit={cadLancamento}>
        <label>Nome </label>
        <input
          type='text'
          name='nome'
          placeholder='Nome do lancamento'
          onChange={valorInput}
        />
        <br />
        <br />
        <label>Valor </label>
        <input
          type='text'
          name='valor'
          placeholder='Valor'
          value={valorLancTarget}
          onChange={valorLancamento}
        />
        <br />
        <br />
        <label>Tipo </label>
        <br />
        <select name='tipo' id='tipo' onChange={valorInput}>
          <option value=''>Selecione</option>
          <option value='1'>Pagamento</option>
          <option value='2'>Recebido</option>
        </select>
        <br />
        <br />
        <label>Situação </label>
        <br />
        <select name='situacao' id='situacao' onChange={valorInput}>
          <option value=''>Selecione</option>
          <option value='1'>Pago</option>
          <option value='2'>Pendente</option>
          <option value='3'>Recebido</option>
        </select>
        <br />
        <br />
        <label>Data de pagamento </label>
        <br />
        <input type='date' name='dataPagamento' onChange={valorInput} />
        <br />
        <br />
        <button type='submit'>Cadastrar </button>
      </form>
      <br />

      <button id='home'>
        <a href='/'>Home</a>
      </button>
    </div>
  );
};
