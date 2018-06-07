import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import Header from './components/header/Header';
import Login from './components/login/Login';
import LoginPage from './components/login/LoginPage';
import PatientSearch from './components/search/PatientSearch';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import { SESSION_ACTIONS, LOGIN_ACTIONS } from './actions/types';
import sessionReducer from './reducers/sessionReducer';
import loginSagas from './sagas/loginSagas';
import sessionSagas from './sagas/sessionSagas';
import patientApi from './api/patientApi'
import patientSearchSagas from "./sagas/patientSearchSagas";
import patientSearchReducer from "./reducers/patientSearchReducer";
import Accordion from './components/accordion/Accordian';


const reducers = combineReducers({
    session: sessionReducer,
    patientSearch: patientSearchReducer
});

const sagas = function*() {
    yield all([
        loginSagas(),
        sessionSagas(),
        patientSearchSagas()
    ]);
};

module.exports = {
    Header,
    Login,
    LoginPage,
    PatientSearch,
    AuthenticatedRoute,
    SESSION_ACTIONS,
    LOGIN_ACTIONS,
    reducers,
    sagas,
    patientApi,
    Accordion
};
