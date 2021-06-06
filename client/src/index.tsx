import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MovieService from './services/MovieService'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


MovieService.getMovies({}).then(res => {
  res.data.forEach(m => {
    console.log(m.name, m.types);
  })
})