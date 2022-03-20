import React from "react";
import { Link } from "react-router-dom";
import landing from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={landing.Landing}>
      <h1 className={landing.Header}> AppCountries </h1>
      <div className={landing.Subt}>
        Aplicación creada para buscar, filtrar y ver información detallada de países.
        ¡Crea tus actividades turísticas y compártelas con el mundo!
      </div>
      <Link to="/home">
        <button className={landing.btnEnter}> Entrar al sitio </button>
      </Link>
    </div>
  );
}
