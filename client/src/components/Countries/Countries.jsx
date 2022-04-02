import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActividades,
  orderByContinent,
  orderByName,
  orderByActivity,
  orderByArea,
  orderByPopulation,
  topFive,
} from "../../actions/actions";
import s from "./Countries.module.css";
import { NavLink } from "react-router-dom";
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
  const [trigger, setTrigger] = useState([]);

  
  const orderCountries = (type) => {
    dispatch(orderByName(type));
    setTrigger([...trigger, 1, dispatch]);
  };
  
  const orderCountriesArea = (type) => {
    dispatch(orderByArea(type));
    setTrigger([...trigger, 1, dispatch]);
  };

  const orderCountriesPopulation = (type) => {
    dispatch(orderByPopulation(type));
    setTrigger([...trigger, 1, dispatch]);
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
  }, [page, paises, firstCountryToShow, lastCountrytoShow]);

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
      <div className={s.filtersCont}>
        <p>Filter by Name</p>
        <button className={s.paged} onClick={() => orderCountries("ASC")}>A-Z</button>
        <button className={s.paged} onClick={() => orderCountries("DSC")}>Z-A</button>
        <p>By Continent</p>
        <select className={s.paged} name="continentOrder" onChange={handleSelect}>
          <option value="continent">Continent</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <p>By Activity</p>
          <select className={s.paged} onChange={e=> handleSelectAct(e)}>
            <option value="all">All activities</option>
            {activities?.map((x) => (
              
              <option key={x.id} value={x.name}>
                {x.name}
              </option>
            ))}
          </select>
        <p>By Area</p>
        <button className={s.paged} onClick={() => orderCountriesArea("MAX")}>Max-Min</button>
        <button className={s.paged} onClick={() => orderCountriesArea("MIN")}>Min-Max</button>
        <p>By Population</p>
        <button className={s.paged} onClick={() => orderCountriesPopulation("MAX")}>Max-Min</button>
        <button className={s.paged} onClick={() => orderCountriesPopulation("MIN")}>Min-Max</button>
      </div>
                                    {/* CARDS */}
      <div>
        {countriesToShow.map((country) => {
          return (
            <NavLink to={`/home/countryDetail/${country.name}`}>
              <button className={s.card}>
                  <img className={s.imgCard} src={country.flags} alt="Not Found" />
                <div>
                  <h3 id="title">{country.name}</h3>
                  <p>{country.continent}</p>
                  <p>{country.population} people.</p>
                </div>
              </button>
            </NavLink>
          );
        })}

        {paises.length > countriesPerPage && (
          <div className={s.filtersCont1}>
            <button className={s.left} onClick={() => handleChangePag("-")}>🢀</button>
            <span className={s.page}>{page}</span>
            <button className={s.right} onClick={() => handleChangePag("+")}>🢂</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Countries;
