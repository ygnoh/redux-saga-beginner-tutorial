import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import Counter from './Counter';
import reducer from './reducers';
// import our saga
import { helloSaga } from './sagas';

const sagaMiddleWare = createSagaMiddleWare();

// connect our middleware to the store using applyMiddleWare
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleWare)
);
// start our saga
sagaMiddleWare.run(helloSaga);

const action = type => store.dispatch({type});

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
