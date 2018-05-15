import types from 'redux-types';

const basicTypes = ['SUCCEEDED', 'PENDING', 'FAILED', 'REQUESTED'];

const fetchTypes = ['FETCH_SUCCEEDED', 'FETCH_PENDING', 'FETCH_FAILED', 'FETCH_REQUESTED'];

export const SESSION_ACTIONS = types('session', fetchTypes);

export const LOGIN_ACTIONS = types('login', basicTypes);
