import React from "react";
import { NavLink } from "react-router-dom";
import s from "./navBar.module.css";

export default function NavBar() {
  return (
    <nav className={s.container}>
      <ul className={s.searchBarUl}>
        <div className={s.title}>AppCountries</div>

        <div className={s.Links}>
          <NavLink style={{ textDecoration: 'none', color: "black" }}to="/home">
            <span>Home Page</span>
          </NavLink>
        </div>

        <div className={s.Links}>
          <NavLink style={{ textDecoration: 'none', color: "black" }}to="/addAct">
            <span>Create Activity</span>
          </NavLink>
        </div>
      </ul>
    </nav>
  );
}
