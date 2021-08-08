import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/layout.css";

const Layout = ({ children }) => {
  const [date, setDate] = useState(new Date());

  function addZeroToTime(n) {
    return (n < 10 ? "0" : "") + n;
  }

  let time = `${addZeroToTime(date.getHours())}:${addZeroToTime(date.getMinutes())}:${addZeroToTime(date.getSeconds())}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <header className="header">
        <Link className="header-color" to="/">
          Strona główna
        </Link>
        <p className="timer">{time}</p>
      </header>
      <main className="container">{children}</main>
      <footer className="footer">
        <Link className="footer-color" to="polityka-prywatnosci">
          Polityka prywatności
        </Link>
      </footer>
    </>
  );
};

export default Layout;
