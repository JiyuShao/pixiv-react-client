export default {
  fetchTrendingTags
};

function toast() {
  return {
    type: 'TOAST'
  }
}

function fetchTrendingTags() {
  return {
    type: 'FETCH_TRENDING_TAGS'
  }
}
