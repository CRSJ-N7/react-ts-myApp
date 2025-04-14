import { Link } from "react-router-dom";
import c from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={c.navigation}>
      <Link to="/login">
        Логин
      </Link>
      <Link to="/profile">Профиль</Link>
    </nav>
  );
};

export default Navigation;