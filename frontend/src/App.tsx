import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const scrollTarget = new URLSearchParams(search).get("scroll");
    if (!scrollTarget) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
