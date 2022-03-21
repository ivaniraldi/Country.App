import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getCountryByName } from "../../actions/actions";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getCountryByName(name));
    console.log("soy el input", e.target.value);
  }

  function onSearch(e) {
    e.preventDefault();
    dispatch(getCountryByName(name));
    setName("");
    console.log("soy el botón", name);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Country.."
        onChange={(e) => handleChange(e)}
      ></input>

      <button type="submit" onClick={(e) => onSearch(e)}>
        Search Country
      </button>
    </div>
  );
}
