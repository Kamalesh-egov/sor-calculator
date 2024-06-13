import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SORCalculation from './components/SORCalculation';

const App: React.FC = () => {
  return(
    <Router>
      <div className='p-4'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sor-calculation" element={<SORCalculation/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
