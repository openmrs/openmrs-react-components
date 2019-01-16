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
import CardList from './components/cardList/CardList';
import PatientHeader from './components/header/PatientHeader';
import PatientCard from './components/patient/PatientCard';
import ToolTip from './components/tooltip/ToolTip';
import LoadingView from './components/loading/LoadingView';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import Logout from './components/login/Logout';
import HomePage from './components/home/HomePage';
import PatientSearch from './components/search/PatientSearch';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import DataGrid from './components/grid/DataGrid';
import EncounterFormPanel from './components/form/EncounterFormPanel';
import EncounterForm from './components/form/EncounterForm';
import FieldInput from './components/widgets/FieldInput';
import Section from './components/form/Section';
import ButtonGroup from './components/widgets/ButtonGroup';
import Dropdown from './components/widgets/Dropdown';
import LineChart from './components/widgets/LineChart';
import SortableTable from './components/table/SortableTable';
import CustomDatePicker from './components/widgets/CustomDatePicker';
import LabsSummary from './components/widgets/LabsSummary';
import Obs from './components/form/Obs';
import ObsGroup from './components/form/ObsGroup';
import EncounterDate from './components/form/EncounterDate';
import Submit from './components/form/Submit';
import Cancel from './components/form/Cancel';
import Errors from './components/errors/Errors';
import Loader from './components/widgets/Loader';
import TaskList from './components/task/TaskList';
import BasicLayout from './components/layout/BasicLayout';
import EncounterHistory from './components/encounter/EncounterHistory';
import ProgramEnrollment from './components/program/ProgramEnrollment';
import Head from './components/header/Head';
import SystemAlert from './components/system/SystemAlert';
import ObsValue from './components/obs/ObsValue';
import ObsHistory from './components/obs/ObsHistory';
import createListReducer from './features/list/createListReducer';
import { SESSION_TYPES, sessionSagas, sessionActions } from './features/session/';
import { systemWatcherSaga } from './features/system';
import { LOGIN_TYPES, loginSagas, loginActions } from './features/login';
import { openmrsFormSagas, formActions, formValidations, formUtil, FORM_STATES } from './features/form';
import { headerSagas, headerActions } from './features/header';
import { errorsActions } from './features/errors';
import { constantsSagas, constantsActions } from './features/constants';
import { VISIT_TYPES, visitActions, visitSagas } from './features/visit';
import { GRID_TYPES, gridActions } from './features/grid';
import { patientSagas, patientActions, PATIENT_TYPES } from "./features/patient";
import { locationActions, locationSagas } from "./features/location";
import { conceptSagas, conceptActions } from "./features/concept";
import { patientIdentifierTypesActions, patientIdentifierTypesSagas } from "./features/patientIdentifierTypes";
import { systemActions } from "./features/system";
import {
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  patientSearchSagas
} from "./features/search/";
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
import { faCaretDown, faCalendarAlt, faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import withLocalisation, { setLocaleMessages } from './components/localization/withLocalisation';
import { mountWithIntl, shallowWithIntl } from './components/localization/test/helpers/intl-test';

fontAwesomeLibrary.add(faCaretDown, faCalendarAlt, faCheck, faArrowRight);


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
    patientSagas()
  ]);
};

module.exports = {
  patientUtil,
  formUtil,
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
