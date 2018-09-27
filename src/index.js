import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import patientUtil from './domain/patient/patientUtil';
import visitRestRepToPatientObjConverter from './domain/patient/converters/visitRestRepToPatientObjConverter';
import patientObjByEncounterTypeFilter from './domain/patient/filters/patientObjByEncounterTypeFilter';
import patientObjByVisitLocationFilter from './domain/patient/filters/patientObjByVisitLocationFilter';
import encountersByEncounterTypeFilter from './domain/encounter/filters/encountersByEncounterTypeFilter';
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
import EncounterFormPage from './components/form/EncounterFormPage';
import EncounterForm from './components/form/EncounterForm';
import FieldInput from './components/widgets/FieldInput';
import Section from './components/form/Section';
import ButtonGroup from './components/widgets/ButtonGroup';
import Dropdown from './components/widgets/Dropdown';
import SortableTable from './components/table/SortableTable';
import CustomDatePicker from './components/widgets/CustomDatePicker';
import Obs from './components/form/Obs';
import EncounterDate from './components/form/EncounterDate';
import Submit from './components/form/Submit';
import Cancel from './components/form/Cancel';
import Errors from './components/errors/Errors';
import Loader from './components/widgets/Loader';
import TaskList from './components/task/TaskList';
import BasicLayout from './components/layout/BasicLayout';
import createListReducer from './features/list/createListReducer';
import { SESSION_TYPES, sessionReducers, sessionSagas, sessionActions } from './features/session/';
import { LOGIN_TYPES, loginReducers, loginSagas, loginActions } from './features/login';
import { openmrsFormSagas, formActions, formValidations, formReducers } from './features/form';
import { headerReducers, headerSagas, headerActions } from './features/header';
import { errorsActions, errorsReducers } from './features/errors';
import { VISIT_TYPES, visitActions, visitSagas } from './features/visit';
import { GRID_TYPES, gridActions } from './features/grid';
import { patientsReducer, patientSelectedReducer, patientActions, PATIENT_TYPES } from "./features/patient";
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
import conceptRest from './rest/conceptRest';
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import withLocalisation, { setLocaleMessages } from './components/localization/withLocalisation';
import { mountWithIntl, shallowWithIntl } from './components/localization/test/helpers/intl-test';
import Head from './components/header/Head';

fontAwesomeLibrary.add( faCaretDown );

const reducers = combineReducers({
  session: sessionReducers,
  loginLocations: loginReducers,
  header: headerReducers,
  patients: patientsReducer,
  selectedPatient: patientSelectedReducer,
  patientSearch: patientSearchReducers,
  errors: errorsReducers,
  form: formReducers
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
  patientUtil,
  visitRestRepToPatientObjConverter,
  patientObjByEncounterTypeFilter,
  patientObjByVisitLocationFilter,
  encountersByEncounterTypeFilter,
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
  EncounterFormPage,
  EncounterForm,
  Section,
  FieldInput,
  ButtonGroup,
  Dropdown,
  SortableTable,
  CustomDatePicker,
  Obs,
  EncounterDate,
  Submit,
  Cancel,
  Errors,
  TaskList,
  BasicLayout,
  formActions,
  formValidations,
  VISIT_TYPES,
  visitActions,
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  GRID_TYPES,
  gridActions,
  errorsActions,
  patientActions,
  PATIENT_TYPES,
  encounterRest,
  loginRest,
  patientRest,
  sessionRest,
  locationRest,
  visitRest,
  reportingRest,
  conceptRest,
  reducers,
  sagas,
  loginActions,
  sessionActions,
  SESSION_TYPES,
  headerActions,
  withLocalisation,
  setLocaleMessages,
  mountWithIntl,
  shallowWithIntl,
  Loader,
  Head,
};
