import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import Patient from './domain/patient/Patient';
import visitRestRepToPatientObjConverter from './domain/patient/converters/visitRestRepToPatientObjConverter';
import patientObjByEncounterTypeFilter from './domain/patient/filters/patientObjByEncounterTypeFilter';
import patientObjByVisitLocationFilter from './domain/patient/filters/patientObjByVisitLocationFilter';
import Accordion from './components/accordion/Accordian';
import Header from './components/header/Header';
import HeaderAlt from './components/header/HeaderAlt';
import LocationMenu from './components/header/LocationMenu';
import List from './components/list/List';
import PatientHeader from './components/header/PatientHeader';
import ToolTip from './components/tooltip/ToolTip';
import LoadingView from './components/loading/LoadingView';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import Logout from './components/login/Logout';
import PatientSearch from './components/search/PatientSearch';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import DataGrid from './components/grid/DataGrid';
import OpenMRSForm from './components/form/OpenMRSForm';
import FieldInput from './components/form/FieldInput';
import ButtonGroup from './components/form/ButtonGroup';
import Obs from './components/form/Obs';
import Submit from './components/form/Submit';
import Errors from './components/errors/Errors';
import createListReducer from './features/list/createListReducer';
import { SESSION_TYPES, sessionReducers, sessionSagas, sessionActions } from './features/session/';
import { LOGIN_TYPES, loginReducers, loginSagas, loginActions } from './features/login';
import { openmrsFormSagas, formActions } from './features/form';
import { headerReducers, headerSagas, headerActions } from './features/header';
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
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
fontAwesomeLibrary.add( faCaretDown );

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
    headerSagas(),
    openmrsFormSagas()
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
  HeaderAlt,
  LocationMenu,
  List,
  ToolTip,
  PatientHeader,
  Login,
  LoginPage,
  Logout,
  LOGIN_TYPES,
  LoadingView,
  PatientSearch,
  AuthenticatedRoute,
  DataGrid,
  OpenMRSForm,
  FieldInput,
  ButtonGroup,
  Obs,
  Submit,
  Errors,
  formActions,
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
  sagas,
  loginActions,
  sessionActions,
  SESSION_TYPES,
  headerActions
};
