import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import Slideshow from './Slideshow'
import * as serviceWorker from './serviceWorker';
import Forsidetext from './Forsidetext'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Slideshow />
    <Forsidetext />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
