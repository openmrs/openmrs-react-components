import Header from './components/refapp/Header';
import sessionActions from './actions/sessionActions';
import sessionReducer from './reducers/sessionReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  session: sessionReducer
})

module.exports = {
  Header,
  sessionActions,
  reducers
};
