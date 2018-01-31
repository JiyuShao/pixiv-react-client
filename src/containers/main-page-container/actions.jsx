export default {
  toggleTab
};

function toggleTab(tab) {
  return {
    type: 'TOGGLE_TAB',
    payload: tab
  }
}
