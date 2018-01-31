import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import _api from 'utils/api';

function* fetchTrendingTags() {
  try {
    const response = yield call(_api.get, '/v1/trending-tags/illust');
    yield put({ type: "FETCH_TRENDING_TAGS__SUCCESS", response: response.trend_tags });
  } catch (e) {
    yield put({ type: "FETCH_TRENDING_TAGS__FAILED", message: e.message });
  }
}

export default [
  takeEvery('FETCH_TRENDING_TAGS', fetchTrendingTags),
];
