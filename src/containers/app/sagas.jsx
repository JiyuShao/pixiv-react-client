import { all } from 'redux-saga/effects';
import HomePageSagas from 'containers/home-page/sagas';
import SearchPageSagas from 'containers/search-page/sagas';

export default function* rootSaga() {
  yield all([
    ...HomePageSagas,
    ...SearchPageSagas,
  ]);
}
