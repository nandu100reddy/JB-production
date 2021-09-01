import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './core/store/Store';
import history from './core/store/History';
import App from './App';
import reportWebVitals from './reportWebVitals';

const target = document.getElementById('root');



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router>
          <App />
        </Router>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode >,
  target
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
