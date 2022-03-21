import React from "react";
import { NavLink } from "react-router-dom";
import navBar from "./navBar.module.css";

export default function NavBar(props) {
  return (
    <nav>
      <ul>
        <div>AppCountries</div>

        <div>
          <NavLink activeStyle={{ fontWeight: "bold" }} to="/home">
            <span>Pagina principal</span>
          </NavLink>
        </div>

        <div>
          <NavLink activeStyle={{ fontWeight: "bold" }} to="/addAct">
            <span>Nueva actividad</span>
          </NavLink>
        </div>

        <div>
          <NavLink activeStyle={{ fontWeight: "bold" }} to="/activities">
            <span>Actividades</span>
          </NavLink>
        </div>
        <div>
          <NavLink activeStyle={{ fontWeight: "bold" }} to="/about">
            <span>Sobre mi</span>
          </NavLink>
        </div>
      </ul>
    </nav>
  );
}
