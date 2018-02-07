function fetchRecommendedResult(params) {
  let url = `/v1/illust/recommended?include_ranking_illusts=true`;
  return {
    type: 'FETCH_RECOMMENDED_RESULT',
    payload: {
      url
    },
  }
}

export default {
  fetchRecommendedResult,
}
