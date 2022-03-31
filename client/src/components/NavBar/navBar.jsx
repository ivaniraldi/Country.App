import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCountryByName} from "../../actions/actions";
import s from "./navBar.module.css";

export default function NavBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getCountryByName(name));
  }


  function onSearch(e) {
    e.preventDefault();
    dispatch(getCountryByName(name));
    setName("");
  }

  return (
    <nav className={s.container}>
      <div className={s.searchBarUl}>
        <div className={s.title}>AppCountries</div>

        
            <div className={s.searchBar}>
              <input
                className={s.inputSearch}
                type="text"
                placeholder="Type a country..."
                onChange={(e) => handleChange(e)}
              ></input>

              <button
                className={s.buttonSearch}
                type="submit"
                onClick={(e) => onSearch(e)}
              >Search Country</button>
            </div>


        <div className={s.Links}>
          <NavLink
            style={{ textDecoration: "none", color: "aliceblue", fontSize: 22 }}
            to="/home"          >
            <span>Home Page</span>
          </NavLink>

        </div>

        <div className={s.Links}>
          <NavLink
            style={{ textDecoration: "none", color: "aliceblue", fontSize: 22 }}
            to="/addAct"    >
            <span>Create Activity</span>
          </NavLink>
          <div>

          </div>
        </div>
      </div>
    </nav>
  );
}
