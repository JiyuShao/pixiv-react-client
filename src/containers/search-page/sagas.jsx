import { call, put, takeEvery } from 'redux-saga/effects';

import _api from 'utils/api';

function* fetchTrendingTags() {
  try {
    const response = yield call(_api.get, '/v1/trending-tags/illust');
    yield put({ type: "FETCH_TRENDING_TAGS__SUCCESS", response: response.trend_tags });
  } catch (e) {
    yield put({ type: "FETCH_TRENDING_TAGS__FAILED", message: e.message });
  }
}

function* fetchSearchResult(action) {
  try {
    const response = yield call(_api.get, action.payload.url);
    yield put({ type: "FETCH_SEARCH_RESULT__SUCCESS", response: response, searchText: action.payload.searchText });
  } catch (e) {
    yield put({ type: "FETCH_SEARCH_RESULT__FAILED", message: e.message });
  }
}

export default [
  takeEvery('FETCH_TRENDING_TAGS', fetchTrendingTags),
  takeEvery('FETCH_SEARCH_RESULT', fetchSearchResult),
];
