import { React, useEffect, useState } from 'react';
import {
  Container,
  ConteudoTitulo,
  Titulo,
  ButtomSucess,
  BotaoAcao,
  AnteriorProximo,
  ButtomPrimary,
  Table,
  TextDanger,
  TextSucess
} from '../styles/custom_adm';

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
    <Container>
      <ConteudoTitulo>
        <Titulo>Listar Situação financeira</Titulo>
        <BotaoAcao>
          <ButtomSucess>Cadastrar</ButtomSucess>
        </BotaoAcao>
      </ConteudoTitulo>
      <AnteriorProximo>
        <ButtomPrimary type='button' onClick={() => anterior()}>
          Anterior
        </ButtomPrimary>
        <span>{dataView.mes + '/' + dataView.ano}</span>
        <ButtomPrimary type='button' onClick={() => proximo()}>
          Proximo
        </ButtomPrimary>
      </AnteriorProximo>
      <Table>
        <thead>
          <tr>
            <th>ID {data.id} </th>
            <th>Nome {data.nome} </th>
            <th>Tipo {data.tipo} </th>
            <th>Situação {data.situacao} </th>
            <th>Valor {data.valor} </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>
                {item.tipo === 1 ? (
                  <TextDanger>Pagamento</TextDanger>
                ) : (
                  <TextSucess>Recebido</TextSucess>
                )}
              </td>
              <td>{item.situacao}</td>
              <td>{item.valor}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td>400</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};
