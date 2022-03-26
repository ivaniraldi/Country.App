import './App.css';
import { Routes ,Route } from 'react-router-dom';
import LandingPage from './components/Landing/landing';
import Countries from './components/Countries/Countries';
import CreateActivity from "./components/CreateActivity/CreateActivity"
import CountryDetails from "./components/CountryDetails/CountryDetails"

function App() {
  return (
    <>
    <Routes>
          <Route path="/home"element={<Countries/>}/>
          <Route path="/addAct" element={<CreateActivity/>} />
          <Route path="/activities"  />
          <Route path="/home/countryDetail/:name" element={<CountryDetails/>}/>
          <Route path='/' element={<LandingPage/>} />
    </Routes>
    </>
  );
}

export default App;
