import * as React from "react";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { formatPhoneNumber } from "../utils";

export default function ClickAway(tenant) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }}>
        <button type="button" onClick={handleClick}>
          {tenant.name}
        </button>
        {open ? (
          <Box sx={styles}>
            {formatPhoneNumber(tenant.phoneNumber)} <hr />
            {tenant.memo}
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
