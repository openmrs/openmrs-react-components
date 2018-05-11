import types from 'redux-types';

const fetchTypes = ['FETCH_SUCCEEDED', 'FETCH_PENDING', 'FETCH_FAILED', 'FETCH_REQUESTED'];

export const SESSION_ACTIONS = types('session', fetchTypes);
