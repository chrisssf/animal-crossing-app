import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css';

// import Fish from './pages/Fish.js'
// import Bugs from './pages/Bugs.js'
// import Animal from './pages/Animal.js'
import Home from './pages/Home'
import Checklist from './pages/Checklist.js'
// import Navigation from './components/Navigation.js'

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Route exact path="/" render={() => <Home />} />
          {/* <Route path="/bugs" render={() => <Animal animalCategory="bugs" />} />
          <Route path="/fish" render={() => <Animal animalCategory="fish" />} /> */}
          <Route path="/bugs" render={() => <Checklist listType="bugs" />} />
          <Route path="/fish" render={() => <Checklist listType="fish" />} />
          <Route path="/art" render={() => <Checklist listType="art" />} />

        </div>
      </Router>

      {/* // <div className="App">
      //     <Animal animalCategory={"bugs"} />
      // </div> */}
    </>
  );
}

export default App;
