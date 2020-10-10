import React from 'react';
import './assests/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './router/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
