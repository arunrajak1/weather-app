import React from 'react';
import { Home } from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Charts from './components/Charts/Charts';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CityChart from './components/Charts/CityChart';

const App = ({weatherData}) => {
  return (
    <div className=''>
     <Router>
      <Navigation/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/charts" element={<Charts stateData={weatherData}/>} />
        <Route path="/city-chart" element={<CityChart />} />
      </Routes>
     </Router>
    </div>
  )
}

export default App;
