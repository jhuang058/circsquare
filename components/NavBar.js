import Link from "next/link";
import classes from "./NavBar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";

const NavBar = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}></div>
      <nav>
        <ul>
          <li>
            <HomeIcon />
            <Link href="/">HomePage</Link>
          </li>
          <li>
            <AddBoxIcon />
            <Link href="/new-listing">Add New Listing</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
