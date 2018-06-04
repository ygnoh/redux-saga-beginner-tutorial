import { delay } from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';

function* helloSaga() {
  console.log('Hello Sagas!');
}

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

/**
 * now we only export the rootSaga.
 * single entry point to start all Sagas at once.
 * this saga yields an array with the results of calling our two sagas.
 * this means the two resulting Generators will be started in parallel.
 */
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ]);
}