import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../actions/actions";

export default function NavBar() {
  let s = "";
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getCountryByName(name));
  }



  return (
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/home">touristicGate🚀</a>
    <a class="navbar-brand" href="/addAct">Create an activity</a>
    <form class="d-flex">
      <input onChange={e=>handleChange(e)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
  );
}
