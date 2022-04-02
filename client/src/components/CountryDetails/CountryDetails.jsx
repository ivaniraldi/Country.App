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
  };

  return (
    <div className="countrydetails">
      <NavBar />
      <div className={s.cardDet}>

        <h1 className={s.acts}>{countries[0].name}</h1>
        <div className={s.imgCont}>
        <img className={s.flagDet} src={countries[0].flags} alt="Not Found" />
        </div>
        <div className={s.acts2}>
          <p>ID: {countries[0].id}</p>
          <p>CONTINENT: {countries[0].continent}</p>
          <p>SUBREGION: {countries[0].subregion}</p>
          <p>CAPITAL: {countries[0].capital}</p>
          <p>AREA: {countries[0].area} km²</p>
          <p>POPULATION: {countries[0].population} people</p>
        </div>

        {countries[0].activities?.map((e) => (
          <div className={s.acts1}>
            <h1 className={s.acts}>Activities:</h1>
            <h2>{e.name}</h2>
            <div>Duration: {e.duration} day/s</div>
            <div>Difficulty: {e.difficulty} / 5</div>
            <div>Season: {e.season}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryDetails;
