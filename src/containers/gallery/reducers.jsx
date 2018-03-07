import _ from 'lodash';

function getDefaultState() {
  return {
    src: undefined,
  }
}

function toggleGallery(state, action) {
  let finalState = _.cloneDeep(state);
  finalState.src = action.payload;
  return finalState;
}

export default {
  'gallery': (state = getDefaultState(), action) => {
    switch (action.type) {
      case 'GALLERY__TOGGLE':
        return toggleGallery(state, action);
      default:
        return state
    }
  }
}
