import actions from "./actions";

const defaultState = {
  trendingTags: [],
  toastData: undefined,
};

export default {
  'search-page': (state = defaultState, action) => {
    switch (action.type) {
      case 'TOAST':
        return toast(state, action);
      case 'FETCH_TRENDING_TAGS__SUCCESS':
        return fetchTrendingTags(state, action, true);
      case 'FETCH_TRENDING_TAGS__FAILED':
        return fetchTrendingTags(state, action, false);
      default:
        return state
    }
  }
}

function toast(state, action) {
  console.log(state);

  console.log(action);

  let finalState = state;

  return finalState;
}

function fetchTrendingTags(state, action, status) {
  let finalState = state;
  if (status) {
    finalState = {
      ...state,
      ...{
        trendingTags: action.response
      }
    }
  } else {
    finalState = {
      ...state,
      ...{
        trendingTags: defaultState.trendingTags,
        toast: {
          content: action.message,
          type: 'cancel',
        }
      }
    }
  }
  return finalState;
}
