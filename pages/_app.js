import NavBar from "../components/NavBar";
import "../styles/globals.css";
import AppBar from "../components/AppBar";
import Drawer from "../components/Drawer";
import Pagination from "../components/Pagination";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      {/* <Drawer /> */}
      <Component {...pageProps} />
      
    </>
  );
}

export default MyApp;
