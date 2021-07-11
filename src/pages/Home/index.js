import { React, useEffect, useState } from 'react';

export const Home = () => {
  var dataAtual = new Date();
  var ano = dataAtual.getFullYear();
  var mes = dataAtual.getMonth() + 1;

  const [data, setData] = useState([]);
  const [dataView, setDataView] = useState({
    ano,
    mes,
  });

  const anterior = async () => {
    if (dataView.mes === 1) {
      setDataView({
        ano: dataView.ano - 1,
        mes: 12,
      });
    } else {
      setDataView({
        ano: dataView.ano,
        mes: dataView.mes - 1,
      });
    }
  };
  const proximo = async () => {
    if (dataView.mes === 12) {
      setDataView({
        ano: dataView.ano + 1,
        mes: 1,
      });
    } else {
      setDataView({
        ano: dataView.ano,
        mes: dataView.mes + 1,
      });
    }
  };

  const listarExtrato = async (e) => {
    var valores = [
      {
        id: 3,
        nome: 'Agua',
        valor: 50.0,
        tipo: 1,
        situacao: 'Pago',
      },
      {
        id: 2,
        nome: 'Luz',
        valor: 120.0,
        tipo: 1,
        situacao: 'Pago',
      },
      {
        id: 1,
        nome: 'Net',
        valor: 95.0,
        tipo: 1,
        situacao: 'Pendente',
      },
      {
        id: 0,
        nome: 'Salario',
        valor: 1250.0,
        tipo: 2,
        situacao: '',
      },
    ];
    setData(valores);
    console.log(data);
  };

  useEffect(() => {
    listarExtrato();
  }, []);

  return (
    <div>
      <h1>Listar Situação financeira</h1>
      <p>Ano atual:{dataView.ano}</p>
      <p>Mes atual:{dataView.mes}</p>
      <button type='button' onClick={() => anterior()}>
        Anterior
      </button>
      <button type='button' onClick={() => proximo()}>
        Proximo
      </button>
      <table>
        <thead>
          <tr>
            <th>ID {data.id} </th>
            <th>Nome {data.nome} </th>
            <th>Tipo {data.tipo} </th>
            <th>Valor {data.valor} </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.tipo === 1 ? <p>Pagamento</p> : <p>Recebido</p>}</td>
              <td>{item.valor}</td>
              <td>{item.situacao}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>400</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
