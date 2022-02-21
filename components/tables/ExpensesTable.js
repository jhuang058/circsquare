import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function sumExpenses(expensesBook) {
    return Object.values(expensesBook).reduce((a,b) => a+b)
  }

function Row(expensesBook) {

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}  onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          Expenses
        </TableCell>
        <TableCell align="right">${sumExpenses(expensesBook.row)}</TableCell>
      </TableRow>

      {/* Collapsible starts here */}
      <TableRow className="collapse-container">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="expensesBreakdownByCategory">
                <TableBody>
                  {Object.entries(expensesBook.row).map((entry) => (
                    <TableRow key={entry[0]}>
                      <TableCell component="th" scope="row">
                        {entry[0]}
                      </TableCell>
                      <TableCell align="right">${entry[1]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable(props) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
            <Row row={setExpensesMap(props.expenses)} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}



function setExpensesMap(expenses) {

    let expensesBook = {
        'Utilities': 0,
        'Mortgage Interest':0,
        'Tax':0,
        'Insurance':0,
        'Other':0
    }

    expenses.forEach(expense => {
        if (expense.expenseType === "utilities") {
            expensesBook['Utilities'] += expense.amount
        } else if (expense.expenseType === "mortgageInterest") {
            expensesBook['Mortgage Interest'] += expense.amount
        } else if (expense.expenseType === "tax") {
            expensesBook['Tax'] += expense.amount
        } else if (expense.expenseType === "insurance") {
            expensesBook['Insurance'] += expense.amount
        } else if (expense.expenseType === "other") {
            expensesBook['Other'] += expense.amount
        }
        
    })
    return expensesBook
}