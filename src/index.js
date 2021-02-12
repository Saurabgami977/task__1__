import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';

import './index.css';
import App from './App/App';
import contactsReducer from './store/reducers/contacts';
import pageReducer from './store/reducers/page';

const rootReducer = combineReducers({
  contactsReducer,
  pageReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
