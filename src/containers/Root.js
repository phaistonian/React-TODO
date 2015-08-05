import React, { Component } from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import todos from '../reducers/todos';
import App from './App';
import { devTools, persistState } from 'redux-devtools';
import { DebugPanel, DevTools, LogMonitor } from 'redux-devtools/lib/react';

// App
let store;
export default class Root extends Component {
  constructor (props) {
    super(props);

    let finalCreateStore = compose(
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    );

    store = finalCreateStore(todos);
  }
  render () {
    return (
      <div>
        <Provider store={store}>
          {() => <App />}
        </Provider>

        <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}
