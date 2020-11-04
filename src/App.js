import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css';

import Fish from './pages/Fish.js'
import Bugs from './pages/Bugs.js'
import Animal from './pages/Animal.js'
import Home from './pages/Home'
// import Navigation from './components/Navigation.js'

function App() {

  const [ userId, setUserId ] = useState(null)

  return (
    <>

      <Router>
        <div className="App">
          <Route exact path="/" render={() => <Home setUserId={setUserId} userId={userId} />} />
          <Route path="/bugs" render={() => <Animal animalCategory="bugs" userId={userId}/>} />
          <Route path="/fish" render={() => <Animal animalCategory="fish" userId={userId}/>} />

        </div>
      </Router>


      {/* // <div className="App">
      //     <Animal animalCategory={"bugs"} />
      // </div> */}
    </>
  );
}

export default App;
