import React, { useState, useEffect } from 'react';
import api from './services/api';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

interface IProduto {
  _id: string;
  title: string;
  value: number;
  quantity: number;
  description: string;
}

export default function MyTable() {
  const classes = useStyles();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await api.get('/produtos');
      setProdutos(request.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      {loading && <span>carregando...</span>}
      {!loading && (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Produto</StyledTableCell>
              <StyledTableCell align="right">Valor</StyledTableCell>
              <StyledTableCell align="right">Quantidade</StyledTableCell>
              <StyledTableCell align="right">Descrição</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto: IProduto) => {
              return (
                <StyledTableRow key={produto._id}>
                  <StyledTableCell component="th" scope="row">
                    {produto._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {produto.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {produto.value}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {produto.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {produto.description}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
