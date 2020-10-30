import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css';

import Fish from './pages/Fish.js'
import Bugs from './pages/Bugs.js'
import Animal from './pages/Animal.js'

function App() {

  

  return (

    <Router>
      <div className="App">
        <Route path="/bugs" render={() => <Animal animalCategory="bugs" />} />
        <Route path="/fish" render={() => <Animal animalCategory="fish" />} />

      </div>
    </Router>


      // <div className="App">
      //     <Animal animalCategory={"bugs"} />
      // </div>

  );
}

export default App;
