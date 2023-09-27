// Import necessary modules
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import {Navbar} from './Components/Navbar';
import RegisterEntry from './Components/RegisterEntry';
import Approve from './Components/View';
import Prescribe from './Components/Prescribe';
import Receipt from './Components/Receipt';

// Create the main App component
function App() {

  const [main,setMain] = useState([]);

  const enterDetails = (data)=>{
    console.log(data);
    setMain(data);
  }
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<RegisterEntry/>} />
          <Route path="/prescribe" element={<Prescribe enterDetails={enterDetails}/>} />
          <Route path="/view" element={<Approve/>} />
          <Route path="/receipt" element={<Receipt prescription={main} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
