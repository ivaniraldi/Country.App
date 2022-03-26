import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./search.module.css"
import { getCountryByName } from "../../actions/actions";

export default function SearchBar() {
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
    <div className={s.searchBar}>
      <input
      className={s.inputSearch}
        type="text"
        placeholder="Type a country..."
        onChange={(e) => handleChange(e)}
      ></input>

      <button className={s.buttonSearch} type="submit" onClick={(e) => onSearch(e)}>
        Search Country
      </button>
    </div>
  );
}
