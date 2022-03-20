import './App.css';
import { Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
          <div>
            <Route exact path="/"/>
            <Route exact path="/home"/>
            <Route exact path="/home/countryDetail/:name"/>
            <Route exact path="/addAct"/>
            <Route exact path="/activities"/>
          </div>
    </div>
  );
}

export default App;
