import './App.css';
import { Routes ,Route } from 'react-router-dom';
import LandingPage from './components/Landing/landing';
import About from './components/About/about';
import Countries from './components/Countries/Countries';

function App() {
  return (
    <>
    <Routes>
          <Route path="/home"element={<Countries/>}/>
          <Route path="/addAct" />
          <Route path='/about' element={<About/>} />
          <Route path='/' element={<LandingPage/>} />
    </Routes>
    </>
  );
}

export default App;
