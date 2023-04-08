import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components'
import "./main.scss";
import "react-markdown-editor-lite/lib/index.css";

ReactDOM.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
  document.getElementById('root')
);