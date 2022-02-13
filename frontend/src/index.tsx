import React from 'react';
import ReactDOM from 'react-dom';
import { hatch } from "./near/index";
import { App } from './App'


hatch().then(({ currentUser }) => {
  ReactDOM.render(
    <App currentUser={currentUser} />,
    document.getElementById('root')
  );
});
