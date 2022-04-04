import React, { useEffect } from "react";
import s from "./CountryDetails.module.css";
import { getCountryByName } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/navBar";

const CountryDetails = () => {
  const dispatch = useDispatch();
  const { name: country } = useParams();

  useEffect(() => {
    dispatch(getCountryByName(country));
  }, [country, dispatch]);

  const countries = useSelector((state) => state.filterCountries);

  if (!countries) {
    return <h1>Please wait</h1>;
  }

  return (
    <div className="countrydetails">
      <NavBar />
      <div className="container">
        <div className="card" style={{ textDecoration: "none", width:"35rem", margin:"10px", color:"black"}}>
            <img
              className="card-img-top"
              src={countries[0].flags}
              alt="Not Found"
              />
              <div className="card-body">
          <h1 className="card-title">{countries[0].name}</h1>
          <div className="card-body">
          </div>
          <div className={s.acts2}>
            <p className="card-text">ID: {countries[0].id}</p>
            <p className="card-text">CONTINENT: {countries[0].continent}</p>
            <p className="card-text" >SUBREGION: {countries[0].subregion}</p>
            <p className="card-text">CAPITAL: {countries[0].capital}</p>
            <p className="card-text">AREA: {countries[0].area} km²</p>
            <p className="card-text">POPULATION: {countries[0].population} people</p>
          {countries[0].activities?.map((e) => (
            <div className="container">
              <h4 className="card-title">Activity:</h4>
              <h5>{e.name}</h5>
              <div>Duration: {e.duration} day/s</div>
              <div>Difficulty: {e.difficulty} / 5</div>
              <div>Season: {e.season}</div>
            </div>
          ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
