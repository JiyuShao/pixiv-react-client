import MainPageReducers from 'containers/main-page-container/reducers';
import SearchPageReducers from 'containers/search-page/reducers';

export default {
  ...MainPageReducers, //the name is already in this reducer
  ...SearchPageReducers,
}
