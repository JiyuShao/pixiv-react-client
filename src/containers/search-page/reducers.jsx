import Toast from 'components/toast';

function getDefaultState() {
  return {
    tab: 'tags',
    trendingTags: [],
    searchText: '',
    sortOptions: {
      search_target: 'partial_match_for_tags',
      sort: 'date_desc',
      word: '',
    },
    searchResult: {
      searchText: '',
      next_url: '',
      records: [],
    },
    galleryDisplay: false,
    galleryDisplayUrl: '',
  };
}

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
        trendingTags: getDefaultState().trendingTags,
      }
    }
    Toast.cancel(action.message);
  }
  return finalState;
}

function textChange(state, action) {
  return {
    ...state,
    tab: 'tags',
    searchText: (action.payload) ? action.payload : '',
    searchResult: getDefaultState().searchResult,
  }
}

function fetchSearchResult(state, action, status) {
  let finalState = state;

  if (status) {
    finalState = {
      ...state,
      tab: 'result',
      searchText: action.searchText,
      sortOptions: {
        ...state.sortOptions,
        word: action.searchText,
      },
      searchResult: {
        searchText: action.searchText,
        next_url: action.response.next_url,
        records: [
          ...(state.searchResult.searchText === action.searchText ? state.searchResult.records : []),
          ...action.response.illusts
        ],
      },
    };
  } else {
    finalState = {
      ...state,
      ...{
        tab: 'result',
        searchText: action.searchText,
        searchResult: getDefaultState().searchResult,
        sortOptions: getDefaultState().sortOptions,
      }
    }
    Toast.cancel(action.message);
  }
  return finalState;
}

export default {
  'search-page': (state = getDefaultState(), action) => {
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
      default:
        return state
    }
  }
}
