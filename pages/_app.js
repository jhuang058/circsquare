import NavBar from "../components/NavBar";
import "../styles/globals.css";
import AppBar from "../components/AppBar";
import Drawer from "../components/Drawer";
import Pagination from "../components/Pagination";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppBar />
      <NavBar />
      {/* <Drawer /> */}
      <Component {...pageProps} />
      <Pagination />
    </>
  );
}

export default MyApp;
