import Accordion from './components/accordion/Accordion';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import BasicLayout from './components/layout/BasicLayout';
import ButtonGroup from './components/widgets/ButtonGroup';
import Cancel from './components/form/Cancel';
import CardList from './components/search/CardList';
import createListReducer from './features/list/createListReducer';
import CustomDatePicker from './components/widgets/CustomDatePicker';
import DataGrid from './components/grid/DataGrid';
import Dropdown from './components/widgets/Dropdown';
import EncounterDate from './components/form/EncounterDate';
import EncounterForm from './components/form/EncounterForm';
import EncounterFormPanel from './components/form/EncounterFormPanel';
import EncounterHistory from './components/encounter/EncounterHistory';
import encountersByEncounterTypeFilter from './domain/encounter/filters/encountersByEncounterTypeFilter';
import Errors from './components/errors/Errors';
import FieldInput from './components/widgets/FieldInput';
import FormContext from './components/form/FormContext';
import Head from './components/header/Head';
import Header from './components/header/Header';
import HeaderAlt from './components/header/HeaderAlt';
import HomePage from './components/home/HomePage';
import LineChart from './components/widgets/LineChart';
import List from './components/list/List';
import Loader from './components/widgets/Loader';
import LoadingView from './components/loading/LoadingView';
import LocalizedMessage from './components/localization/LocalizedMessage';
import LocationMenu from './components/header/LocationMenu';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import Logout from './components/login/Logout';
import { mountWithIntl, shallowWithIntl } from './components/localization/test/helpers/intl-test';
import Obs from './components/form/Obs';
import ObsGroup from './components/form/ObsGroup';
import ObsHistory from './components/obs/ObsHistory';
import ObsValue from './components/obs/ObsValue';
import PatientCard from './components/patient/PatientCard';
import PatientHeader from './components/header/PatientHeader';
import PatientSearch from './components/search/PatientSearch';
import patientUtil from './domain/patient/patientUtil';
import ProgramEnrollment from './components/program/ProgramEnrollment';
import Section from './components/form/Section';
import SortableTable from './components/table/SortableTable';
import Submit from './components/form/Submit';
import SystemAlert from './components/system/SystemAlert';
import Tabs from './components/tabs/Tabs';
import TaskList from './components/task/TaskList';
import ToolTip from './components/tooltip/ToolTip';
import withLocalization, { initializeLocalization, setDefaultLocale, addLocaleMessages, getIntl } from './components/localization/withLocalization';

import patientObjByEncounterTypeAndObsFilter from './domain/patient/filters/patientObjByEncounterTypeAndObsFilter';
import patientObjByEncounterTypeFilter from './domain/patient/filters/patientObjByEncounterTypeFilter';
import patientObjByVisitLocationFilter from './domain/patient/filters/patientObjByVisitLocationFilter';

import { conceptSagas, conceptActions } from './features/concept';
import { errorsActions } from './features/errors';
import { formActions, formValidations, formUtil, FORM_STATES, openmrsFormSagas } from './features/form';
import { GRID_TYPES, gridActions } from './features/grid';
import { globalPropertySagas, globalPropertyActions } from './features/globalproperty';
import { headerSagas, headerActions } from './features/header';
import { locationActions, locationSagas } from './features/location';
import { LOGIN_TYPES, loginSagas, loginActions } from './features/login';
import { patientActions, PATIENT_TYPES } from './features/patient';
import { patientIdentifierTypesActions, patientIdentifierTypesSagas } from './features/patientIdentifierTypes';
import { PATIENT_SEARCH_TYPES, patientSearchActions, patientSearchSagas } from './features/search/';
import { SESSION_TYPES, sessionSagas, sessionActions } from './features/session/';
import { systemActions, systemWatcherSaga } from './features/system';
import { VISIT_TYPES, visitActions, visitSagas } from './features/visit';

import {
  faCaretDown,
  faTimes,
  faExclamationTriangle,
  faCalendarAlt,
  faCheck,
  faArrowRight,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';

import conceptRest from './rest/conceptRest';
import encounterRest from './rest/encounterRest';
import locationRest from './rest/locationRest';
import loginRest from './rest/loginRest';
import orderRest from './rest/orderRest';
import obsRest from './rest/obsRest';
import patientRest from './rest/patientRest';
import providerRest from './rest/providerRest';
import reportingRest from './rest/reportingRest';
import sessionRest from './rest/sessionRest';
import visitRest from './rest/visitRest';


import { all } from 'redux-saga/effects';

import { axiosInstance } from './config';

import { reducers, selectors } from './store';

import visitRestRepToPatientObjConverter from './domain/patient/converters/visitRestRepToPatientObjConverter';

fontAwesomeLibrary.add(
  faCaretDown,
  faTimes,
  faExclamationTriangle,
  faCalendarAlt,
  faCheck,
  faArrowRight,
  faPencilAlt
);

const sagas = function*() {
  yield all([
    loginSagas(),
    sessionSagas(),
    systemWatcherSaga(),
    patientSearchSagas(),
    visitSagas(),
    headerSagas(),
    openmrsFormSagas(),
    conceptSagas(),
    locationSagas(),
    patientIdentifierTypesSagas(),
    globalPropertySagas()
  ]);
};

module.exports = {
  Accordion,
  addLocaleMessages,
  AuthenticatedRoute,
  BasicLayout,
  ButtonGroup,
  Cancel,
  CardList,
  createListReducer,
  CustomDatePicker,
  DataGrid,
  Dropdown,
  EncounterDate,
  EncounterForm,
  EncounterFormPanel,
  EncounterHistory,
  encountersByEncounterTypeFilter,
  Errors,
  FieldInput,
  FormContext,
  Head,
  Header,
  HeaderAlt,
  HomePage,
  getIntl,
  initializeLocalization,
  LineChart,
  List,
  Loader,
  LoadingView,
  LocalizedMessage,
  LocationMenu,
  Login,
  LoginPage,
  Logout,
  mountWithIntl,
  Obs,
  ObsGroup,
  ObsHistory,
  ObsValue,
  PatientCard,
  PatientHeader,
  PatientSearch,
  patientUtil,
  ProgramEnrollment,
  Section,
  setDefaultLocale,
  shallowWithIntl,
  SortableTable,
  Submit,
  SystemAlert,
  Tabs,
  TaskList,
  ToolTip,
  withLocalization,

  patientObjByEncounterTypeAndObsFilter,
  patientObjByEncounterTypeFilter,
  patientObjByVisitLocationFilter,

  conceptActions,
  errorsActions,
  formActions,
  formValidations,
  formUtil,
  FORM_STATES,
  GRID_TYPES,
  gridActions,
  globalPropertyActions,
  headerActions,
  locationActions,
  LOGIN_TYPES,
  loginActions,
  patientActions,
  PATIENT_TYPES,
  patientIdentifierTypesActions,
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  SESSION_TYPES,
  sessionActions,
  systemActions,
  VISIT_TYPES,
  visitActions,

  conceptRest,
  encounterRest,
  locationRest,
  loginRest,
  orderRest,
  obsRest,
  patientRest,
  providerRest,
  reportingRest,
  sessionRest,
  visitRest,

  axiosInstance,
  reducers,
  sagas,
  selectors,
  visitRestRepToPatientObjConverter,
};
