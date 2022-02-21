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
import {addDollarSign} from '../../utils'

function total(roomUnits) {
    let paymentArray = [];
    roomUnits.forEach(roomUnit => {
        roomUnit.tenant.rentalPaymentHistory.forEach(payment => {
            paymentArray.push(payment)
        })
    })

    return paymentArray.map(({amountPaid}) => amountPaid).reduce((sum, i) => sum + i, 0);
  }

function Row(props) {

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
          Income
        </TableCell>
        <TableCell align="right">${total(props.row.roomUnits)}</TableCell>
      </TableRow>

      {/* This is the collapsible */}
      <TableRow className="collapse-container">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="unitsIncomeByMonth">
                <TableHead>
                  <TableRow>
                    <TableCell>Unit</TableCell>
                    <TableCell>Jan.</TableCell>
                    <TableCell>Feb.</TableCell>
                    <TableCell>Mar.</TableCell>
                    <TableCell>Apr.</TableCell>
                    <TableCell>May</TableCell>
                    <TableCell>Jun.</TableCell>
                    <TableCell>Jul.</TableCell>
                    <TableCell>Aug.</TableCell>
                    <TableCell>Sep.</TableCell>
                    <TableCell>Oct.</TableCell>
                    <TableCell>Nov.</TableCell>
                    <TableCell>Dec.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.row.roomUnits.map((unit) => (
                    <TableRow key={unit.unitTitle}>
                      <TableCell component="th" scope="row">
                        {unit.unitTitle}
                      </TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[0]?.amountPaid)}{unit.tenant.rentalPaymentHistory[0]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[1]?.amountPaid)}{unit.tenant.rentalPaymentHistory[1]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[2]?.amountPaid)}{unit.tenant.rentalPaymentHistory[2]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[3]?.amountPaid)}{unit.tenant.rentalPaymentHistory[3]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[4]?.amountPaid)}{unit.tenant.rentalPaymentHistory[4]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[5]?.amountPaid)}{unit.tenant.rentalPaymentHistory[5]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[6]?.amountPaid)}{unit.tenant.rentalPaymentHistory[6]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[7]?.amountPaid)}{unit.tenant.rentalPaymentHistory[7]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[8]?.amountPaid)}{unit.tenant.rentalPaymentHistory[8]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[9]?.amountPaid)}{unit.tenant.rentalPaymentHistory[9]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[10]?.amountPaid)}{unit.tenant.rentalPaymentHistory[10]?.amountPaid}</TableCell>
                      <TableCell>{addDollarSign(unit.tenant.rentalPaymentHistory[11]?.amountPaid)}{unit.tenant.rentalPaymentHistory[11]?.amountPaid}</TableCell>
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
            <Row row={props} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
