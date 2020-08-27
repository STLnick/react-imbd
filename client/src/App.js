import React from 'react';
import { Route, Switch } from 'react-router-dom'

import { Header } from './components'
import { Home, Movies, TV } from './views'

import './App.css';

export const App = () => {
  return (
    <div className="page-container flex flex--column flex--align-center flex--justify-center">
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/movies'>
          <Header />
          <Movies />
        </Route>
        <Route path='/TV'>
          <Header />
          <TV />
        </Route>
      </Switch>
    </div>
  );
}
