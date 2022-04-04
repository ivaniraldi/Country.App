import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/navBar"
import img from "./Travel.png"

export default function LandingPage() {
  let landing = ""
  return (
    <>
    <div className="container" >
    <div className="container" style={{marginTop:"100px"}}>
      <div className="row">
        <div className="col">
      <h1 > touristicGate🚀 </h1>
      Application created to search, filter and view detailed information of
        countries. Create your tourist activities and share them with the world!
        </div>
      <div className="col">
      <div className="container">
      <img src={img} style={{width:"400px"}} alt="Not found"></img>
      </div>

      </div>

      <Link to="/home">
        <button className="btn btn-dark"> Let's get started! </button>
      </Link>
      </div>
    </div>
    </div>
    </>
  );
}
