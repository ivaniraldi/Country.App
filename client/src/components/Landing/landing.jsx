import React from "react";
import { Link } from "react-router-dom";
import landing from "./landing.module.css";
import img from "./Travel.png"

export default function LandingPage() {
  return (
    <>
    <div className={landing.Landing}>
      <div className={landing.HeaderC}>
      <h1 className={landing.Header}> AppCountries </h1>
      </div>

      <div className={landing.Subt}>
        Aplicación creada para buscar, filtrar y ver información detallada de
        países. ¡Crea tus actividades turísticas y compártelas con el mundo!
      </div>

      <Link to="/home">
        <button className={landing.btnEnter}> Entrar al sitio </button>
      </Link>
      <div className={landing.imgContainer}>
      <img src={img} className={landing.imageT} alt="Not found"></img>
      </div>
    </div>
    </>
  );
}
