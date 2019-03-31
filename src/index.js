import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App/App';
import * as serviceWorker from 'helpers/serviceWorker';
import Provider from 'context/App/Provider';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
