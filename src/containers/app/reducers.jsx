import NoReducer from 'containers/no-reducer/reducers';
import SearchPageReducers from 'containers/search-page/reducers';

export default {
  ...NoReducer,
  ...SearchPageReducers,//the name is already in this reducer
}
