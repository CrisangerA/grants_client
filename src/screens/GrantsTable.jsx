import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
  makeStyles, Grid, Toolbar, Typography, IconButton, Tooltip, TableContainer, Table, TableBody,
  TableRow, TableCell, TablePagination, Paper, TableHead, TableSortLabel, Skeleton
} from '../components/Material';
import { Refresh } from '../components/Icons';
import config from '../config/config';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '700px'
  },
  table: {
    width: '100%'
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

export default function GrantsTable() {
  const history = useHistory();
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);

  const headCells = ['Opportinity Number', 'Opportinity Title', 'Agency', 'Opportinity Status', 'Posted Date', 'Closed Date'];

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true);
      const res = await fetch(`${config.urlBase}/api/grants?page=${page}&limit=${limit}`);
      const data = await res.json();
      //setLimit(20)
      console.log(data);
      setRows(data);
      setLoading(false);
    }
    handleGetData();
  }, [page, limit]);

  const handleBuildData = async (e) => {
    try {
      toast.info("Generando 1000 primeros registros, esta operación puede tardar un momento");
      setLoading(true);
      const res = await fetch(`${config.urlBase}/api/buildata`);
      setPage(0);
      setLimit(20);
      const data = await res.json();
      //console.log(data);
      setRows(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(parseInt(event.target.value, 10));
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const _headerToolbar = () => {
    return (
      <Toolbar className={classes.root}>
        <Typography variant="h6" id="tableTitle" component="div" className={classes.title}>
          Search Grants
        </Typography>

        <Tooltip title="Generar Información">
          <IconButton disabled={loading} aria-label="filter list" onClick={handleBuildData}>
            <Refresh color={loading ? 'disabled' : "secondary"} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
  };

  const _header = () => {
    return <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell key={index}>
            <TableSortLabel direction="desc">
              {headCell}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  }

  const _rows = () => {
    if (loading) {
      return (
        <div style={{ width: '100%', position: 'absolute' }}>
          {
            Array.from({ length: 30 }).map((_, i) => <Skeleton key={i} variant="text" />)
          }
        </div>
      )
    }

    if (rows.length > 0) {
      const handleClick = (oppId) => (e) => {
        history.push(`/details/${oppId}`);
      }
      return rows.map((row, i) =>
        <TableRow hover onClick={handleClick(row.href)} key={row.id}>
          <TableCell>{row.opportunity_number}</TableCell>
          <TableCell>{row.opportunity_title}</TableCell>
          <TableCell>{row.agency}</TableCell>
          <TableCell>{row.opportunity_status}</TableCell>
          <TableCell>{row.posted_date}</TableCell>
          <TableCell>{row.close_date}</TableCell>
        </TableRow>
      )
    }
    return (
      <TableRow>
        <TableCell>
          {'No hay elementos'}
        </TableCell>
      </TableRow>
    )
  }


  return (
    <div>
      <Grid container>
        <Grid item className={classes.table}>

          <Paper>
            {_headerToolbar()}
            <TableContainer className={classes.container}>
              <Table stickyHeader>
                {_header()}
                <TableBody>
                  {_rows()}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={1000}
              rowsPerPage={limit}
              labelRowsPerPage="Quantity"
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>

        </Grid>
      </Grid>
      <ToastContainer position="bottom-center" closeOnClick />
      <div></div>
    </div>
  )
}
