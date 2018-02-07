import Toast from 'components/toast';

function getDefaultState() {
  return {
    recommendedResult: {
      illusts: [],
      ranking_illusts: [],
      next_url: '',
    }
  };
}

function fetchRecommendedResult(state, action, status) {
  let finalState = state;

  if (status) {
    finalState = {
      ...state,
      recommendedResult: action.response,
    }
  } else {
    finalState = {
      ...state,
      recommendedResult: getDefaultState().recommendedResult,
    }
    Toast.cancel(action.message);
  }
  return finalState;
}

export default {
  'home-page': (state = getDefaultState(), action) => {
    switch (action.type) {
      case 'FETCH_RECOMMENDED_RESULT__SUCCESS':
        return fetchRecommendedResult(state, action, true);
      case 'FETCH_RECOMMENDED_RESULT__FAILED':
        return fetchRecommendedResult(state, action, false);
      default:
        return state
    }
  }
}
