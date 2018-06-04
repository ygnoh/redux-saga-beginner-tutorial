import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import Counter from './Counter';
import reducer from './reducers';
// import our saga
import rootSaga from './sagas';

const sagaMiddleWare = createSagaMiddleWare();

// connect our middleware to the store using applyMiddleWare
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleWare)
);
// start our saga
sagaMiddleWare.run(rootSaga);

const action = type => store.dispatch({type});

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
