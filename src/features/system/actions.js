import types, { UPDATE_SERVICEWORKER } from './types';

const systemPollStartAction = () => ({ type: types.SYSTEM_POLL_START });
const systemPollStopAction = () => ({ type: types.SYSTEM_POLL_STOP });
const updateServiceworker = () => ({ type: UPDATE_SERVICEWORKER });

export default {
  systemPollStartAction,
  systemPollStopAction,
  updateServiceworker
};
