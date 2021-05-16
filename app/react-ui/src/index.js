import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import reducer from './state/reducer';
import { StateProvider } from './state/state';

ReactDOM.render(
  <Router>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </Router>,
  document.getElementById('root'),
);
