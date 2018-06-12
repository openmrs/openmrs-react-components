import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import Accordion from './components/accordion/Accordian';
import Header from './components/header/Header';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import PatientSearch from './components/search/PatientSearch';
import PatientInfo from './components/patient/PatientInfo';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import DataGrid from './components/grid/DataGrid';
import { sessionReducers, sessionSagas } from './features/session/';
import { loginSagas } from './features/login';
import { VISIT_TYPES, visitActions, visitSagas } from './features/visit';
import {
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  patientSearchReducers,
  patientSearchSagas
} from "./features/patientSearch/";


const reducers = combineReducers({
  session: sessionReducers,
  patientSearch: patientSearchReducers
});

const sagas = function* () {
  yield all([
    loginSagas(),
    sessionSagas(),
    patientSearchSagas(),
    visitSagas()
  ]);
};

module.exports = {
  Accordion,
  Header,
  Login,
  LoginPage,
  PatientInfo,
  PatientSearch,
  AuthenticatedRoute,
  DataGrid,
  VISIT_TYPES,
  visitActions,
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  reducers,
  sagas
};
