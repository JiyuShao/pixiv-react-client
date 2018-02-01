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

function fetchSearchResult(text) {
  let url = '/v1/search/illust?';
  let defaultParams = {
    search_target: 'partial_match_for_tags',
    sort: 'date_desc',
    word: text,
  };
  for (const currentParam in defaultParams) {
    if (defaultParams.hasOwnProperty(currentParam)) {
      url += `${currentParam}=${defaultParams[currentParam]}&`;
    }
  }
  return {
    type: 'FETCH_SEARCH_RESULT',
    payload: {
      url: url,
      searchText: text
    }
  }
}

function galleryToggle(index) {
  return {
    type: 'GALLERY_TOGGLE',
    payload: index
  }
}

export default {
  fetchTrendingTags,
  textChange,
  fetchSearchResult,
  galleryToggle,
};
