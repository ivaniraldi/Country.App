import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../actions/actions";

export default function NavBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getCountryByName(name));
  }



  return (
<nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/home">touristicGate🚀</a>
    <a className="btn btn-success" href="/addAct">Create an activity</a>
    <form className="d-flex">
      <input onChange={e=>handleChange(e)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
  );
}
