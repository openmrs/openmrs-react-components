import types from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.SYSTEM_POLL_SUCCESS:{
      const systemInfo = action.data['SystemInfo.title.openmrsInformation'];
      const runtime = action.data['SystemInfo.title.javaRuntimeEnvironmentInformation'];
      return {
        systemDate: systemInfo['SystemInfo.OpenMRSInstallation.systemDate'],
        systemTime: systemInfo['SystemInfo.OpenMRSInstallation.systemTime'],
        timeZone: runtime['SystemInfo.JavaRuntimeEnv.systemTimezone'],
        systemConnection: true,
      };
    }
    case types.SYSTEM_POLL_FAILURE:{
      return {
        systemConnection: false,
      };
    }

    default:
      return state;
  }
};