/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActividades,
  orderByContinent,
  orderByName,
  orderByActivity,
  orderByArea,
  orderByPopulation,
} from "../../actions/actions";
import s from "./Countries.module.css";
import Navbar from "../NavBar/navBar";

const Countries = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.actividades);
  const paises = useSelector((state) => state.filterCountries) || [];

  const [countriesToShow, setCountriesToShow] = useState([]);
  const [page, setPage] = useState(1);
  const countriesPerPage = 10;
  const lastCountrytoShow = page * countriesPerPage;
  const firstCountryToShow = lastCountrytoShow - countriesPerPage;
  const totalPages = Math.ceil(paises.length / countriesPerPage);
  const [trigger, setTrigger] = useState(Date.now()); // Use a timestamp as the trigger

  const orderCountries = (type) => {
    dispatch(orderByName(type));
    setTrigger(Date.now()); // Update the trigger with a new timestamp
  };

  const orderCountriesArea = (type) => {
    dispatch(orderByArea(type));
    setTrigger(Date.now());
  };

  const orderCountriesPopulation = (type) => {
    dispatch(orderByPopulation(type));
    setTrigger(Date.now());
  };


  useEffect(() => {
    dispatch(getActividades());
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [paises]);

  useEffect(() => {
    setCountriesToShow(paises.slice(firstCountryToShow, lastCountrytoShow));
  }, [trigger, page, paises, firstCountryToShow, lastCountrytoShow]);

  function handleSelect(e) {
    dispatch(orderByContinent(e.target.value));
  }

  function handleSelectAct(e) {
    dispatch(orderByActivity(e.target.value));
  }

  const handleChangePag = (type) => {
    if (type === "-") {
      setPage(page === 1 ? totalPages : page - 1);
    } else {
      setPage(page === totalPages ? 1 : page + 1);
    }
  };

  return (
    <div className={s.backCard}>
      <Navbar />
      {/* FILTERS */}
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <p className="navbar-text mt-3">Filter by Name</p>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => orderCountries("ASC")}
          >
            A-Z
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => orderCountries("DSC")}
          >
            Z-A
          </button>
          <p className="navbar-text mt-3">By Continent</p>
          <select
            className="btn btn-sm btn-outline-secondary"
            name="continentOrder"
            onChange={handleSelect}
          >
            <option value="continent">Continent</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <p className="navbar-text mt-3">By Activity</p>
          <select
            className="btn btn-sm btn-outline-secondary"
            onChange={(e) => handleSelectAct(e)}
          >
            <option value="all">All activities</option>
            {activities?.map((x) => (
              <option key={x.id} value={x.name}>
                {x.name}
              </option>
            ))}
          </select>
          <p className="navbar-text mt-3">By Area</p>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => orderCountriesArea("MAX")}
          >
            Max-Min
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => orderCountriesArea("MIN")}
          >
            Min-Max
          </button>
          <p className="navbar-text mt-3">By Population</p>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => orderCountriesPopulation("MAX")}
          >
            Max-Min
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => orderCountriesPopulation("MIN")}
          >
            Min-Max
          </button>
        </div>
      </div>
      {/* CARDS */}
      <div>
        <div className="container">
          <div className="row">
          {Array.isArray(countriesToShow) && countriesToShow.map((country, i) => {
              return (
                <a
                  key={i}
                  className="card"
                  href={`/home/countryDetail/${country.name}`}
                  style={{ textDecoration: "none", width:"13rem", margin:"10px", color:"black"}}
                >
                  <img
                    className="card-img-top"
                    src={country.flags}
                    alt="Not Found"
                    style={{marginTop:"10px"}}
                  />
                  <div className="card-body">
                    <h5 className="card-title" id="title">{country.name}</h5>
                    <p className="card-text">{country.continent}</p>
                    <p className="card-text">{country.population} people.</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        
        {paises.length > countriesPerPage && (
          <div className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <button className="btn btn-outline-secondary" onClick={() => handleChangePag("-")}>
              🢀
            </button>
            <span className={s.page}>{page}</span>
            <button className="btn btn-outline-secondary" onClick={() => handleChangePag("+")}>
              🢂
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Countries;
