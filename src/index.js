import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import Patient from './domain/Patient';
import Accordion from './components/accordion/Accordian';
import Header from './components/header/Header';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import PatientSearch from './components/search/PatientSearch';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import DataGrid from './components/grid/DataGrid';
import OpenMRSForm from './components/form/OpenMRSForm';
import FieldInput from './components/form/FieldInput';
import Obs from './components/form/Obs';
import Submit from './components/form/Submit';
import Errors from './components/errors/Errors';
import { sessionReducers, sessionSagas } from './features/session/';
import { loginSagas } from './features/login';
import { formSagas } from './features/form';
import { errorsActions, errorsReducers } from './features/errors';
import { VISIT_TYPES, visitActions, visitSagas } from './features/visit';
import { GRID_TYPES, gridActions } from './features/grid';
import {
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  patientSearchReducers,
  patientSearchSagas
} from "./features/search/";
import encounterRest from './rest/encounterRest';
import patientRest from './rest/patientRest';
import loginRest from './rest/loginRest';
import sessionRest from './rest/sessionRest';
import visitRest from './rest/visitRest';


const reducers = combineReducers({
  session: sessionReducers,
  patientSearch: patientSearchReducers,
  errors: errorsReducers
});

const sagas = function* () {
  yield all([
    loginSagas(),
    sessionSagas(),
    patientSearchSagas(),
    visitSagas(),
    formSagas()
  ]);
};

module.exports = {
  Patient,
  Accordion,
  Header,
  Login,
  LoginPage,
  PatientSearch,
  AuthenticatedRoute,
  DataGrid,
  OpenMRSForm,
  FieldInput,
  Submit,
  Obs,
  Errors,
  VISIT_TYPES,
  visitActions,
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  GRID_TYPES,
  gridActions,
  errorsActions,
  encounterRest,
  loginRest,
  patientRest,
  sessionRest,
  visitRest,
  reducers,
  sagas
};
