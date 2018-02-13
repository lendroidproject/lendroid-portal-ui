import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './containers/MainLayout/MainLayout';

import * as reducers from './reducers';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
const reducer = combineReducers(reducers)
const store = createStore(reducer, composeWithDevTools())

const App = (props) => (
  <Provider store={store}>
    <Router>
      <MainLayout {...props} />
    </Router>
  </Provider>
);

export default App;
