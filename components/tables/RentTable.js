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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(
  unitTitle,
  tenant,
  monthlyRate,
  occupancyRate,
  rentalPaymentHistory
) {
  return {
    unitTitle,
    tenant,
    monthlyRate,
    occupancyRate,
    rentalPaymentHistory,
    accumulated: accumulateRent(rentalPaymentHistory, "amountPaid"),
  };
}

function accumulateRent(rentalPaymentHistory, prop) {
  return rentalPaymentHistory?.reduce(function (a, b) {
    return a + b[prop];
  }, 0);
}

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.filter(roomUnit => typeof(roomUnit.accumulated) === "number").map(({ accumulated }) => accumulated).reduce((sum, i) => sum + i, 0);
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <b>{row.unitTitle}</b>
        </TableCell>
        <TableCell align="right">${row.monthlyRate.toFixed(2)}</TableCell>
        <TableCell align="right">{row.occupancyRate}%</TableCell>
        <TableCell align="right">${row.accumulated}</TableCell>
      </TableRow>
      <TableRow className="collapse-container">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Tenant</TableCell>
                    <TableCell align="right">Paid</TableCell>
                    <TableCell align="right">Method</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.rentalPaymentHistory?.map((historyRow) => (
                    <TableRow key={historyRow.payDate}>
                      <TableCell component="th" scope="row">
                        {historyRow.payDate}
                      </TableCell>
                      <TableCell>{row.tenant.name}</TableCell>
                      <TableCell align="right">
                        ${historyRow.amountPaid.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.paymentMethod}
                      </TableCell>
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
    unitTitle: PropTypes.string.isRequired,
    monthlyRate: PropTypes.number.isRequired,
    occupancyRate: PropTypes.number.isRequired,
    rentalPaymentHistory: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        tenant: PropTypes.string.isRequired,
        paid: PropTypes.number.isRequired,
        method: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable(props) {
  let rows = [];

  props.roomUnits.forEach((unit) => {
    rows.push(
      createData(
        unit.unitTitle,
        unit.tenant,
        unit.rate,
        99,
        unit.tenant.rentalPaymentHistory
      )
    );
  });

  const totalRentReceived = subtotal(rows);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Rental&nbsp;Unit</TableCell>
            <TableCell align="right">Monthly&nbsp;Rate</TableCell>
            <TableCell align="right">Occupancy&nbsp;Rate</TableCell>
            <TableCell align="right">Earnings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((unit) => (
            <Row key={unit.unitTitle} row={unit} />
          ))}

          {/* Start of Summary Rows */}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Total Earnings</TableCell>
            <TableCell align="right">${ccyFormat(totalRentReceived)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
