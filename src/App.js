import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomeConnected } from './pages/Home';
import './App.css';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={HomeConnected} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
