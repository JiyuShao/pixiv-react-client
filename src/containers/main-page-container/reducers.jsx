const defaultState = {
  currentTab: 'home'
};

export default {
  'main-page-container': (state = defaultState, action) => {
    switch (action.type) {
      case 'TOGGLE_TAB':
        return {
          ...state,
          ...{
            currentTab: action.payload
          }
        }
      default:
        return state
    }
  }
}
