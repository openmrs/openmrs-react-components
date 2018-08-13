import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import Patient from './domain/patient/Patient';
import visitRestRepToPatientObjConverter from './domain/patient/converters/visitRestRepToPatientObjConverter';
import patientObjByEncounterTypeFilter from './domain/patient/filters/patientObjByEncounterTypeFilter';
import patientObjByVisitLocationFilter from './domain/patient/filters/patientObjByVisitLocationFilter';
import Accordion from './components/accordion/Accordian';
import Header from './components/header/Header';
import List from './components/list/List';
import PatientHeader from './components/header/PatientHeader';
import ToolTip from './components/tooltip/ToolTip';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import PatientSearch from './components/search/PatientSearch';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import DataGrid from './components/grid/DataGrid';
import FieldInput from './components/form/FieldInput';
import Errors from './components/errors/Errors';
import createListReducer from './features/list/createListReducer';
import { sessionReducers, sessionSagas } from './features/session/';
import { loginReducers, loginSagas } from './features/login';
import { headerReducers, headerSagas } from './features/header';
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
import locationRest from './rest/locationRest';
import visitRest from './rest/visitRest';
import reportingRest from './rest/reportingRest';


const reducers = combineReducers({
  session: sessionReducers,
  loginLocations: loginReducers,
  header: headerReducers,
  patientSearch: patientSearchReducers,
  errors: errorsReducers
});

const sagas = function* () {
  yield all([
    loginSagas(),
    sessionSagas(),
    patientSearchSagas(),
    visitSagas(),
    headerSagas()
  ]);
};

module.exports = {
  Patient,
  visitRestRepToPatientObjConverter,
  patientObjByEncounterTypeFilter,
  patientObjByVisitLocationFilter,
  createListReducer,
  Accordion,
  Header,
  List,
  ToolTip,
  PatientHeader,
  Login,
  LoginPage,
  PatientSearch,
  AuthenticatedRoute,
  DataGrid,
  FieldInput,
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
  locationRest,
  visitRest,
  reportingRest,
  reducers,
  sagas
};
