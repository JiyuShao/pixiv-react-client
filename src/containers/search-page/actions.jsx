function fetchTrendingTags() {
  return {
    type: 'FETCH_TRENDING_TAGS'
  }
}

function textChange(text) {
  return {
    type: 'TEXT_CHANGE',
    payload: text
  }
}

function fetchSearchResult(params) {
  let { text, sortOptions, searchResult } = params;
  let url = '';
  if (sortOptions.word === text && searchResult.next_url) { //same search
    url = searchResult.next_url;
  } else {
    sortOptions.word = text;
    url = '/v1/search/illust?' + Object.keys(sortOptions).map(function (key) {
      return (typeof sortOptions[key] === 'undefined' || sortOptions[key] === '') ? '' : `${key}=${sortOptions[key]}`;
    }).join('&');
  }
  return {
    type: 'FETCH_SEARCH_RESULT',
    payload: {
      url: url,
      searchText: text,
    }
  }
}

export default {
  fetchTrendingTags,
  textChange,
  fetchSearchResult,
};
