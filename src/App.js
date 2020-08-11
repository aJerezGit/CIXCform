import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      form: null
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
