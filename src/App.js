import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import Live from './components/Live/Live';
import GameStreams from './components/GameStreams/GameStreams';
import Results from './components/Results/Results';
import Contact from './components/Contact/Contact';


function App(props) {


  return (
    
    <Router >
      <div className="App">
        <Header />
          <Switch>
              <Route exact path="/" component={Games} />
              <Route exact path="/top-streams" component={TopStreams} />
              <Route exact path="/live/:slug" component={Live} />
              <Route exact path="/game/:slug" component={GameStreams} />
              <Route exact path="/results/:slug" component={Results} />
              <Route exact path="/contact" component={Contact} />
          </Switch>
      </div>
  </Router>
  );
}

export default App;

