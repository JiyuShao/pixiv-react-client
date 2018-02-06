function noReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return Object.assign({}, state, action.state)
    case 'REPLACE_STATE':
      return action.state
    default:
      return state
  }
}

export default {
  'no-reducer': noReducer
};
