import React from 'react';
import IssueTracker from './containers/IssueTracker/IssueTracker';
import SearchPage from './containers/SearchPage/SearchPage';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path="/" exact component={IssueTracker} />
      </Switch>
      
    </div>
  );
}


export default App;
