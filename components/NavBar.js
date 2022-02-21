import Link from "next/link";
import classes from "./NavBar.module.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

const NavBar = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}></div>
      <nav>
        <ul>
          <li>
            <HomeOutlinedIcon />
            <Link href="/">HomePage</Link>
          </li>
          <li>
            <AnalyticsOutlinedIcon />
            <Link href="/property-statistics">Performance</Link>
          </li>
          <li>
            <AddOutlinedIcon />
            <Link href="/new-listing">Add New Listing</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
