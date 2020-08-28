import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom'

import { Header } from './components'
import { Home, Movies, TV } from './views'

import './App.css';

export const App = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname === '/' ? null : <Header />}
      <div className="page-container flex flex--column flex--align-center flex--justify-center">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/movies'>
            <Movies />
          </Route>
          <Route path='/TV'>
            <TV />
          </Route>
        </Switch>
      </div>
    </>
  );
}
