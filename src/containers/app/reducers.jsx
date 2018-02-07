import NoReducer from 'containers/no-reducer/reducers';
import HomePageReducers from 'containers/home-page/reducers';
import SearchPageReducers from 'containers/search-page/reducers';

export default {
  ...NoReducer,
  ...HomePageReducers,
  ...SearchPageReducers,//the name is already in this reducer
}
