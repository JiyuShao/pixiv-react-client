import Toast from 'components/toast';

const defaultState = {
  trendingTags: [],
  searchText: '',
  nextSearchUrl: '',
  searchResult: [],
  galleryDisplay: false,
  galleryDisplayUrl: '',
};

function fetchTrendingTags(state, action, status) {
  let finalState = state;
  if (status) {
    finalState = {
      ...state,
      ...{
        trendingTags: action.response,
      }
    };
  } else {
    finalState = {
      ...state,
      ...{
        trendingTags: defaultState.trendingTags,
      }
    }
    Toast.cancel(action.message);
  }
  return finalState;
}

function textChange(state, action) {
  return {
    ...state,
    ...{
      searchText: (action.payload) ?action.payload : ''
    }
  }
}

function fetchSearchResult(state, action, status) {
  let finalState = state;
  if (status) {
    finalState = {
      ...state,
      ...{
        searchText: action.searchText,
        nextSearchUrl: action.response.next_url,
        searchResult: action.response.illusts,
      }
    };
  } else {
    finalState = {
      ...state,
      ...{
        searchText: defaultState.searchText,
        nextSearchUrl: defaultState.nextSearchUrl,
        searchResult: defaultState.searchResult,
      }
    }
    Toast.cancel(action.message);
  }
  return finalState;
}

function galleryToggle(state, action) {
  return {
    ...state,
    ...{
      galleryDisplay: action.payload ? true : !state.galleryDisplay,
      galleryDisplayUrl: action.payload ? action.payload : state.galleryDisplayUrl,
    }
  };
}

export default {
  'search-page': (state = defaultState, action) => {
    switch (action.type) {
      case 'FETCH_TRENDING_TAGS__SUCCESS':
        return fetchTrendingTags(state, action, true);
      case 'FETCH_TRENDING_TAGS__FAILED':
        return fetchTrendingTags(state, action, false);
      case 'TEXT_CHANGE':
        return textChange(state, action);
      case 'FETCH_SEARCH_RESULT__SUCCESS':
        return fetchSearchResult(state, action, true);
      case 'FETCH_SEARCH_RESULT__FAILED':
        return fetchSearchResult(state, action, false);
      case 'GALLERY_TOGGLE':
        return galleryToggle(state, action);
      default:
        return state
    }
  }
}
