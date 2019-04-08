import { all } from 'redux-saga/effects';

import Accordion from './components/accordion/Accordion';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import BasicLayout from './components/layout/BasicLayout';
import ButtonGroup from './components/widgets/ButtonGroup';
import Cancel from './components/form/Cancel';
import CardList from './components/cardList/CardList';
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
import Head from './components/header/Head';
import Header from './components/header/Header';
import HeaderAlt from './components/header/HeaderAlt';
import HomePage from './components/home/HomePage';
import LabsSummary from './components/widgets/LabsSummary';
import LineChart from './components/widgets/LineChart';
import List from './components/list/List';
import Loader from './components/widgets/Loader';
import LoadingView from './components/loading/LoadingView';
import LocationMenu from './components/header/LocationMenu';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import Logout from './components/login/Logout';
import Obs from './components/form/Obs';
import ObsGroup from './components/form/ObsGroup';
import ObsHistory from './components/obs/ObsHistory';
import ObsValue from './components/obs/ObsValue';
import PatientCard from './components/patient/PatientCard';
import PatientHeader from './components/header/PatientHeader';
import patientObjByEncounterTypeAndObsFilter from './domain/patient/filters/patientObjByEncounterTypeAndObsFilter';
import patientObjByEncounterTypeFilter from './domain/patient/filters/patientObjByEncounterTypeFilter';
import patientObjByVisitLocationFilter from './domain/patient/filters/patientObjByVisitLocationFilter';
import PatientSearch from './components/search/PatientSearch';
import patientUtil from './domain/patient/patientUtil';
import ProgramEnrollment from './components/program/ProgramEnrollment';
import Section from './components/form/Section';
import SortableTable from './components/table/SortableTable';
import Submit from './components/form/Submit';
import SystemAlert from './components/system/SystemAlert';
import TaskList from './components/task/TaskList';
import ToolTip from './components/tooltip/ToolTip';
import visitRestRepToPatientObjConverter from './domain/patient/converters/visitRestRepToPatientObjConverter';

import { conceptSagas, conceptActions } from "./features/concept";
import { constantsSagas, constantsActions } from './features/constants';
import { errorsActions } from './features/errors';
import { globalPropertySagas, globalPropertyActions } from "./features/globalproperty";
import { GRID_TYPES, gridActions } from './features/grid';
import { headerSagas, headerActions } from './features/header';
import { locationActions, locationSagas } from "./features/location";
import { LOGIN_TYPES, loginSagas, loginActions } from './features/login';
import { openmrsFormSagas, formActions, formValidations, formUtil, FORM_STATES } from './features/form';
import { patientActions, PATIENT_TYPES } from "./features/patient";
import { patientIdentifierTypesActions, patientIdentifierTypesSagas } from "./features/patientIdentifierTypes";
import { SESSION_TYPES, sessionSagas, sessionActions } from './features/session/';
import { systemActions } from "./features/system";
import { systemWatcherSaga } from './features/system';
import { VISIT_TYPES, visitActions, visitSagas } from './features/visit';

import {
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  patientSearchSagas
} from "./features/search/";
import FormContext from './components/form/FormContext';

import { axiosInstance } from "./config";
import encounterRest from './rest/encounterRest';
import orderRest from './rest/orderRest';
import obsRest from './rest/obsRest';
import patientRest from './rest/patientRest';
import loginRest from './rest/loginRest';
import sessionRest from './rest/sessionRest';
import locationRest from './rest/locationRest';
import visitRest from './rest/visitRest';
import constantsRest from './rest/constantsRest';
import reportingRest from './rest/reportingRest';
import conceptRest from './rest/conceptRest';
import { reducers, selectors } from "./store";
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faTimes, faExclamationTriangle, faCalendarAlt, faCheck, faArrowRight, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import withLocalisation, { setLocaleMessages } from './components/localization/withLocalisation';
import { mountWithIntl, shallowWithIntl } from './components/localization/test/helpers/intl-test';

fontAwesomeLibrary.add(faCaretDown, faTimes, faExclamationTriangle, faCalendarAlt, faCheck, faArrowRight, faPencilAlt);


const sagas = function* () {
  yield all([
    loginSagas(),
    sessionSagas(),
    systemWatcherSaga(),
    patientSearchSagas(),
    visitSagas(),
    headerSagas(),
    openmrsFormSagas(),
    constantsSagas(),
    conceptSagas(),
    locationSagas(),
    patientIdentifierTypesSagas(),
    globalPropertySagas()
  ]);
};

module.exports = {
  FormContext,
  patientUtil,
  formUtil,
  visitRestRepToPatientObjConverter,
  patientObjByEncounterTypeFilter,
  patientObjByEncounterTypeAndObsFilter,
  patientObjByVisitLocationFilter,
  encountersByEncounterTypeFilter,
  createListReducer,
  Accordion,
  Header,
  HeaderAlt,
  LocationMenu,
  List,
  CardList,
  ToolTip,
  PatientHeader,
  PatientCard,
  Login,
  LoginPage,
  Logout,
  HomePage,
  LOGIN_TYPES,
  LoadingView,
  PatientSearch,
  AuthenticatedRoute,
  DataGrid,
  EncounterFormPanel,
  EncounterForm,
  Section,
  FieldInput,
  ButtonGroup,
  Dropdown,
  SortableTable,
  CustomDatePicker,
  Obs,
  ObsGroup,
  ObsValue,
  ObsHistory,
  EncounterDate,
  Submit,
  Cancel,
  Errors,
  TaskList,
  BasicLayout,
  EncounterHistory,
  formActions,
  formValidations,
  FORM_STATES,
  VISIT_TYPES,
  visitActions,
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  GRID_TYPES,
  conceptActions,
  gridActions,
  errorsActions,
  patientActions,
  patientIdentifierTypesActions,
  systemActions,
  PATIENT_TYPES,
  locationActions,
  axiosInstance,
  encounterRest,
  orderRest,
  obsRest,
  loginRest,
  patientRest,
  sessionRest,
  locationRest,
  visitRest,
  reportingRest,
  conceptRest,
  reducers,
  sagas,
  selectors,
  loginActions,
  sessionActions,
  globalPropertyActions,
  SESSION_TYPES,
  headerActions,
  constantsActions,
  constantsRest,
  withLocalisation,
  setLocaleMessages,
  mountWithIntl,
  shallowWithIntl,
  Loader,
  Head,
  LabsSummary,
  LineChart,
  ProgramEnrollment,
  SystemAlert,
};
