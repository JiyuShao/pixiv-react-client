import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import SearchPageSagas from 'containers/search-page/sagas';

export default function* rootSaga() {
  yield all([
    ...SearchPageSagas,
  ]);
};
