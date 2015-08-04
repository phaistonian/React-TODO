import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todos from '../reducers/todos';
import App from './App';

// App
let store;
export default class Root extends Component {
  constructor (props) {
    super(props);
    store = createStore(todos);
  }
  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
