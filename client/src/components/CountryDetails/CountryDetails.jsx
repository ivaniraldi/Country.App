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

  if(!countries){
    return (<h1>Please wait</h1>)
  }

  console.log("hola tengo countries", countries)

  return (

    <div className="countrydetails">
      <NavBar/>
      
      <div className={s.cardDet}>
        <h1 className={s.acts}>{countries[0].name}</h1>
        <img className={s.flagDet} src={countries[0].flags} alt="Not Found" />
        <div className={s.acts2}>
        <h4>ID: {countries[0].id}</h4>
        <h4>CONTINENT: {countries[0].continent}</h4>
        <h4>SUBREGION: {countries[0].subregion}</h4>
        <h4>CAPITAL: {countries[0].capital}</h4>
        <h4>AREA: {countries[0].area} km²</h4>
        <h4>POPULATION: {countries[0].population} people</h4>
        </div>
        <h1 className={s.acts}>ACTIVITIES:</h1>
        {countries[0].activities?.map(e =>
          <div className={s.acts1}>
            <h2>{e.name}</h2>
            <h4>Duration: {e.duration} week/s</h4>
            <h4>Difficulty: {e.difficulty} / 5</h4>
            <h4>Season: {e.season}</h4>
          </div>)}
      </div>
    </div>
      );

  
}

export default CountryDetails;