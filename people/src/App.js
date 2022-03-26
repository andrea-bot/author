import './App.css';
import React from 'react';
import "./App.css";
import { Route, Switch } from 'react-router-dom';
import Authors from './views/Authors';
import NewAuthor from './views/NewAuthor';
import EditAuthors from './views/EditAuthors';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Authors />
        </Route>
        <Route exact path="/new">
          <NewAuthor />
        </Route>
        <Route exact path="/authors/:id">
          <EditAuthors />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
