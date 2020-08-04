import React from 'react';

import { MovieSearch } from './components'

import './App.css';

export const App = () => {
  return (
    <div className="container flex flex--column flex--align-center flex--justify-center">
      <MovieSearch />
    </div>
  );
}
