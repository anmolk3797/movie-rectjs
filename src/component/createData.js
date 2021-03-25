import React from 'react';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, InputBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';


function createData(name, type, language, genre, runtime) {
  return { name, type, language, genre, runtime };
}

const rows = [
  { name: 'The snow spider', type: 'scripted', language: 'english', genre: 'drama,fantasy', runtime: '30' },
  { name: 'Snow', type: 'Scripted', language: 'English', genre: 'Comedy,Family', runtime: '120' },
  { name: 'Listening Snow Tower', type: 'Documentry', language: 'English', genre: 'Drama', runtime: '60' },
  { name: 'Snow Bind', type: 'Scripted', language: 'Chinese', genre: 'Drama, Action, History', runtime: '45' },
  { name: 'Snow Babies', type: 'Scripted', language: 'English', genre: 'Drama', runtime: '60' },
  { name: 'Snow Crash', type: 'Documentry', language: 'English', genre: 'Nature', runtime: '60' },
  { name: 'Snow White', type: 'Scripted', language: 'English', genre: 'Drama, Science-Fiction', runtime: '60' },
  { name: 'SnowFlower', type: 'Scripted', language: 'Korean', genre: 'Drama, Comedy, Romance', runtime: '80' },
  { name: 'Summer Snow', type: 'Scripted', language: 'Korean', genre: 'Drama,  Romance', runtime: '85' },
  { name: 'SummerSnow', type: 'Scripted', language: 'Japanese', genre: 'Drama,  Romance', runtime: '85' },




];


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  // {id:'id', numeric:true, disablePadding:true, lable:'id'},
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'type ', numeric: true, label: 'Type ' },
  { id: 'language', numeric: true, label: 'Language' },
  { id: 'genre', numeric: true, label: 'Genre(s) ' },
  { id: 'runtime', numeric: true, label: 'Runtime' },
];

const options = ['Name', 'Runtime'];
const option = ['Type', 'Language'];


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;



  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (

          <Typography className={classes.title} variant="h6" id="tableTitle" component="div"
            style={{ display: 'flex', flexDirection: 'row' }}>
            {/* Nutrition */}


          Sort TV Show:-
            <Autocomplete style={{ marginLeft: '2px' }}
              id="custom-input-demo"
              options={options}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input style={{ width: 100 }} type="text" {...params.inputProps} />
                </div>
              )}

            />


          </Typography>


        )}

      <Typography className={classes.title} variant="h6" id="tableTitle" component="div"
        style={{ display: 'flex', flexDirection: 'row' }}>


        Filter TV Show:-
          <Autocomplete style={{ marginLeft: '2px' }}
          id="custom-input-demo"
          options={option}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input style={{ width: 100 }} type="text" {...params.inputProps} />
            </div>
          )}

        />

      </Typography>



     
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('type');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchData, setSearchData] = useState(rows);
  const [search, setSearch] = useState("");
  const [searchFeild, setSearchFeild] = useState("");
  const [searchFrom, setSearchFrom] = useState(0);
  const [searchTo, setSearchTo] = useState(0);
  
  


  const onSearchChange = (value) => {
    if (!value) {
      setSearchData(rows);
      return;
    }
    const search = (data, search) => {
      var obj = [],
        index = 0;
      for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
          if (key !== "id") {
            if (data[i][key]?.toString()?.toLowerCase().indexOf(search?.toLowerCase()) != -1) {
              obj[index] = data[i];
              index++;
              break;
            }
          }
        }
      }
      return obj;
    };
    let result = search(rows, value);
    setSearchData(result);
    setSearch(value);
  }

  const handleFilter = () => {
    if (!searchFeild || searchFrom > searchTo) {
      onSearchChange(search);
      return;
    }
    let data = searchData.filter((obj) => {
      return obj[searchFeild] >= searchFrom && obj[searchFeild] <= searchTo;
    });
    setSearchData(data);
  };
  
 
  // const onSortChange = (value) => {
  //   if (!value) {
  //     setSortData(rows);
  //     return;
  //   }
  //   const sort = (data, sort) => {
  //     // Teatr White White 023 White flower
  //     document.write(array);
  //     var obj = [],
  //       index = 0;
  //     for (var i = 0; i < data.length; i++) {
  //       for (var key in data[i]) {
  //         if (key !== "id") {
  //           if (data[i][key]?.toString()?.toLowerCase().indexOf(sort?.toLowerCase()) != -1) {
  //             obj[index] = data[i];
  //             index++;
  //             break;
  //           }
  //         }
  //       }
  //     }
  //     return obj;
  //   };
  //   let result = sort(rows, value);
  //   setSortData(result);

  // }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  // const sortArray = type => {
  //   const types = {
  //     name: 'name',
  //     runtime: 'runtime',
  //   };
  //   const sortProperty = types[type];
  //   const sorted = rows.sort((a, b) => b[sortProperty] - a[sortProperty]);
  //   console.log(sorted);
  //   setSortData(sorted);
  // };

  // useEffect(() => {
  //   const sortArray = type => {
  //     const types = {
  //       name: 'name',
  //       runtime: 'runtime',
  //     };
  //     const sortProperty = types[type];
  //     const sorted = [...rows].sort((a, b) => b[sortProperty] - a[sortProperty]);
  //     setSortData(sorted);
  //   };

  //   sortArray(sortType);
  // }, [sortType]);

 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

        <EnhancedTableToolbar numSelected={selected.length} />
        <div style={{ display: 'flex', flexDirection: 'row', margin: '8px' }}>
          <h3>Search Gener:-</h3>
          <InputBase style={{ marginLeft: '2px' }}
            placeholder="search....."
            id={"outlined-basic"}
            variant={"outlined"}
            inputProps={{ "aria-label": "search....." }}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
          />
        </div>

      
        

        <TableContainer>

          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={searchData.length}
            />


            <TableBody>
              {stableSort(searchData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell >
                        
                    </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.language}</TableCell>
                      <TableCell align="right">{row.genre}</TableCell>
                      <TableCell align="right">{row.runtime}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          data={searchData}

        />
      </Paper>

    </div>
  );
}
