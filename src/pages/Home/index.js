import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
  TextSucess,
  AlertDanger,
  AlertSucess,
} from '../styles/custom_adm';

import api from '../../config/configAPI';

export const Home = () => {
  var dataAtual = new Date();
  var ano = dataAtual.getFullYear();
  var mes = dataAtual.getMonth() + 1;

  const [data, setData] = useState([]);
  const [saldo, setSaldo] = useState();
  const [valorPagamentos, setvalorPagagamentos] = useState();
  const [valorRecebido, setvalorRecebido] = useState();
  const [dataView, setDataView] = useState({
    ano,
    mes,
  });
  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
  });

  const anterior = async () => {
    if (dataView.mes === 1) {
      ano = dataView.ano - 1;
      mes = 12;
      setDataView({
        ano,
        mes,
      });
      listarExtrato(mes, ano);
    } else {
      ano = dataView.ano;
      mes = dataView.mes - 1;
      setDataView({
        ano,
        mes,
      });
      listarExtrato(mes, ano);
    }
  };
  const proximo = async () => {
    if (dataView.mes === 12) {
      ano = dataView.ano + 1;
      mes = 1;
      setDataView({
        ano,
        mes,
      });
      listarExtrato(mes, ano);
    } else {
      ano = dataView.ano;
      mes = dataView.mes + 1;
      setDataView({
        ano,
        mes,
      });
      listarExtrato(mes, ano);
    }
  };

  const listarExtrato = async (mes, ano) => {
    if (mes === undefined && ano === undefined) {
      var dataAtual = new Date();
      ano = dataAtual.getFullYear();
      mes = dataAtual.getMonth() + 1;
    }

    await api
      .get('listar/' + mes + '/' + ano)
      .then((response) => {
        setData(response.data.lancamentos);
        setSaldo(response.data.saldo);
        setvalorRecebido(response.data.valorRecebido);
        setvalorPagagamentos(response.data.valorPagamentos);
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            type: 'erro',
            mensagem: err.response.data.mensagem,
          });
        } else {
          setStatus({
            type: 'erro',
            mensagem: 'Erro: Tente mais tarde',
          });
        }
      });
  };

  useEffect(() => {
    listarExtrato();
  }, []);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Listar Situação financeira</Titulo>
        <BotaoAcao>
          <ButtomSucess>
            <a href='/cadastrar'>Cadastrar</a>
          </ButtomSucess>
        </BotaoAcao>
      </ConteudoTitulo>
      {}
      {status.type === 'sucess' ? (
        <AlertSucess>{status.mensagem}</AlertSucess>
      ) : (
        ''
      )}
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
            <th>ID </th>
            <th>Nome </th>
            <th>Tipo </th>
            <th>Situação</th>
            <th>Data </th>
            <th>Valor </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>
                {item.tipo === 1 ? (
                  <TextDanger>Paguei</TextDanger>
                ) : (
                  <TextSucess>Recebi</TextSucess>
                )}
              </td>
              <td>
                {item.situacao === 1 ? <TextSucess>Pago</TextSucess> : ''}
                {item.situacao === 2 ? <TextDanger>Pendente</TextDanger> : ''}
                {item.situacao === 3 ? <TextSucess>Recebido</TextSucess> : ''}
              </td>
              <td>{moment(item.dataPagamento).format('DD/MM/YYYY')}</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(item.valor)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <br />
          <tr>
            <td>Valor Recebido</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(valorRecebido)}
            </td>
          </tr>
          <tr>
            <td>Valor Pago</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(valorPagamentos)}
            </td>
          </tr>
          <tr>
            <td>Saldo</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(saldo)}
            </td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};
