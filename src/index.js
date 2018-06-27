import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import Patient from './domain/Patient';
import Accordion from './components/accordion/Accordian';
import Header from './components/header/Header';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import PatientSearch from './components/search/PatientSearch';
import PatientInfo from './components/patient/PatientInfo';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import DataGrid from './components/grid/DataGrid';
import OpenMRSForm from './components/form/OpenMRSForm';
import FieldInput from './components/form/FieldInput'
import Obs from './components/form/Obs';
import Submit from './components/form/Submit';
import { sessionReducers, sessionSagas } from './features/session/';
import { loginSagas } from './features/login';
import { formSagas } from './features/form';
import { VISIT_TYPES, visitActions, visitSagas } from './features/visit';
import { PATIENT_TYPES, patientActions, patientSagas } from './features/patient';
import { GRID_TYPES, gridActions } from './features/grid';
import {
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  patientSearchReducers,
  patientSearchSagas
} from "./features/search/";


const reducers = combineReducers({
  session: sessionReducers,
  patientSearch: patientSearchReducers
});

const sagas = function* () {
  yield all([
    loginSagas(),
    sessionSagas(),
    patientSearchSagas(),
    visitSagas(),
    formSagas(),
    patientSagas()
  ]);
};

module.exports = {
  Patient,
  Accordion,
  Header,
  Login,
  LoginPage,
  PatientInfo,
  PatientSearch,
  AuthenticatedRoute,
  DataGrid,
  OpenMRSForm,
  FieldInput,
  Submit,
  Obs,
  VISIT_TYPES,
  visitActions,
  PATIENT_SEARCH_TYPES,
  patientSearchActions,
  GRID_TYPES,
  gridActions,
  PATIENT_TYPES,
  patientActions,
  reducers,
  sagas
};
