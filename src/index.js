import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import Accordion from './components/accordion/Accordian';
import Header from './components/header/Header';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import PatientSearch from './components/search/PatientSearch';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import { sessionReducers, sessionSagas } from './features/session/';
import { loginSagas } from './features/login';
import { patientSearchReducers, patientSearchSagas } from "./features/patientSearch/";


const reducers = combineReducers({
  session: sessionReducers,
  patientSearch: patientSearchReducers
});

const sagas = function* () {
  yield all([
    loginSagas(),
    sessionSagas(),
    patientSearchSagas()
  ]);
};

module.exports = {
  Accordion,
  Header,
  Login,
  LoginPage,
  PatientSearch,
  AuthenticatedRoute,
  reducers,
  sagas
};
