import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActividades, orderByContinent, orderByName, orderByActivity, orderByArea } from "../../actions/actions";
import "./Countries.css"
import { NavLink } from "react-router-dom";


const Countries = () => {
  useEffect(() => {
    dispatch(getActividades())
  }, [])
  const activities = useSelector(state => state.actividades)
  const [countriesToShow, setCountriesToShow] = useState([])
  const dispatch = useDispatch();
  const paises = useSelector((state) => state.filterCountries) || [];
  const [page, setPage] = useState(1)
  const countriesPerPage = 8;
  const lastCountrytoShow = page * countriesPerPage;
  const firstCountryToShow = lastCountrytoShow - countriesPerPage;
  const totalPages = Math.ceil(paises.length / countriesPerPage);
  const [trigger, setTrigger] = useState([])

  const orderCountries = (type) => {
    dispatch(orderByName(type))
    setTrigger([
      ...trigger,
      1
    ])
  }

  const orderCountriesArea = (type) => {
    dispatch(orderByArea(type))
    setTrigger([
      ...trigger,
      1
    ])
  }
  useEffect(() => {
    dispatch(getCountries());
  }, []);
  useEffect(() => {
    setPage(1);
  }, [paises]);
  useEffect(() => {
    setCountriesToShow(paises.slice(firstCountryToShow, lastCountrytoShow));
  }, [page, paises]);
  function handleSelect(e) {
    dispatch(orderByContinent(e.target.value))
  }
  function handleSubmit(e) {
    e.preventDefault()
  }
  function handleSelectAct(e) {
    dispatch(orderByActivity(e.target.value))
  }
  const handleChangePag = (type) => {
    if (type === '-') {
      setPage(page === 1 ? totalPages : page - 1);
    } else {
      setPage(page === totalPages ? 1 : page + 1)
    }
  };
  // if(!activities){
  //   setSelectActivity("null")
  // }  



  return (
    <div className="countries">
      <div className="pes">
        <p>By Name</p>
        <button className="btnsrc" onClick={() => orderCountries("ASC")}>
          A-Z
        </button>
        <button className="btnsrc"  onClick={() => orderCountries("DSC")}>
          Z-A
        </button>
        <p>By Continent</p>
        <select className="select"
          name="continent"
          onChange={handleSelect}
        >
          <option disabled>Continent</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
          <p>By Activity</p>
        <form onSubmit={handleSubmit}>
          <select className="select" name="actividad" value="null" onChange={handleSelectAct}>
            <option value="All" >All activities</option>
            {
              activities?.map((x) => <option value={x.id} key={x.id}>{x.name}</option>)
            }
          </select>
        </form>
        <p>By Area</p>
        <button className="btnsrc"  onClick={() => orderCountriesArea("MAX")}>
          Max-Min
        </button >
        <button  className="btnsrc"  onClick={() => orderCountriesArea("MIN")}>
          Min-Max
        </button>

      </div>
     
      <div className="contenedor">
        {countriesToShow.map((country) => {
          return (
            <NavLink to={`/home/countryDetail/${country.name}`}>
              <button className="buttoncard">
                <div className="cards">
                  <h3 id="title">{country.name}</h3>
                  <p>{country.continent}</p>
                  <img className="flags" src={country.flags} alt="Not Found" />
                </div>
              </button>
            </NavLink>
          );
        })}
        {paises.length > countriesPerPage && (
          <div className="pag">
            <button className="pagbutton" onClick={() => handleChangePag('-')}>🢀</button>
            <span>{page}</span>
            <button className="pagbutton" onClick={() => handleChangePag('+')}>🢂</button>
          </div>
        )}

      </div>




    </div>
  );
};

export default Countries;