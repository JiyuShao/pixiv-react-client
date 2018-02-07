import { call, put, takeEvery } from 'redux-saga/effects';

import wrapper from 'utils/generator-wrapper';
import _api from 'utils/api';

function* fetchRecommendedResult(action) {
  try {
    const response = yield call(_api.get, action.payload.url);
    yield put({ type: "FETCH_RECOMMENDED_RESULT__SUCCESS", response: response});
  } catch (e) {
    yield put({ type: "FETCH_RECOMMENDED_RESULT__FAILED", message: e.message });
  }
}

export default [
  takeEvery('FETCH_RECOMMENDED_RESULT', wrapper(fetchRecommendedResult)),
];
