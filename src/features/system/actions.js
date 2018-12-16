import types from './types';

const systemPollStartAction = () => ({ type: types.SYSTEM_POLL_START });
const systemPollStopAction = () => ({ type: types.SYSTEM_POLL_STOP });

export default {
  systemPollStartAction,
  systemPollStopAction
};
