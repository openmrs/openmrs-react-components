import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as R from 'ramda';
import { parse, differenceInMinutes } from 'date-fns';
import { getUTCOffset, findTimeZone } from 'timezone-support';
import { parseFromTimeZone } from 'date-fns-timezone';
import systemActions from '../../features/system/actions';
import '../../../assets/css/widgets.css';

class Alert extends Component {

  componentDidMount() {
    this.getSystemInfo();
  }

  componentDidUpdate() {
    this.getSystemInfo();
  }

  getSystemInfo() {
    const { session, dispatch } = this.props;

    if (!R.isEmpty(session) && session.authenticated) {
      dispatch(systemActions.systemPollStartAction());
    } else {
      dispatch(systemActions.systemPollStopAction());
    }
  }

  renderAlertMessage() {
    const { system } = this.props;

    const deviceTime = new Date();
    const deviceOffset = deviceTime.getTimezoneOffset();

    const serverTime =  system.timeZone ? parseFromTimeZone(`${system.systemDate}T${system.systemTime}`, { timeZone: `${system.timeZone}` })
      : parse(`${system.systemDate}T${system.systemTime}Z`);

    const serverOffset = system.timeZone ? getUTCOffset(serverTime, findTimeZone(`${system.timeZone}`)).offset : 0;

    const hasTimeZoneOffset = serverOffset !== deviceOffset;

    const timezoneOffset = Math.abs(
      deviceOffset - serverOffset
    ) / 60;

    const timeDifference = Math.abs(
      differenceInMinutes(
        serverTime,
        deviceTime
      ));

    const hasTimeDifference = timeDifference > 5;
    const hasConnection = system.systemConnection && navigator.onLine;

    let alertMessages = [];

    if (hasTimeZoneOffset) {
      alertMessages.push({
        message: `Your current time zone is different from the server by ${timezoneOffset} hour(s)`,
        type: 'time-zone-offset-alert',
      });
    }

    if (hasTimeDifference) {
      alertMessages.push({
        message: `Your device time is different from the server by ${timeDifference} minutes`,
        type: 'time-difference-alert'
      });
    }

    if (!hasConnection) {
      alertMessages = [{
        message: 'APPLICATION DISCONECTED FROM SERVER',
        type: 'connectivity-alert'
      }];
    }

    if (system.serviceWorkerUpdated) {
      alertMessages.push({
        message: `Thers is a newer version of this app`,
        type: 'time-zone-offset-alert',
        key: 'serviceWorkerUpdated'
      });
    } else {
      alertMessages.filter(function( messages ) {
        return messages.key !== 'serviceWorkerUpdated';
      });
    }

    const display = (hasTimeDifference || hasTimeZoneOffset || !hasConnection);


    const displayStyle = display
      ? { display: 'block' } :
      { display: 'none' };

    return (
      <div
        className="system-alerts"
        style={displayStyle}
      >
        {alertMessages.map((item, index) => {
          return (
            <div
              className={item.type}
              key={`${item.type}-${index}`}
            >
              {item.message}
            </div>
          );
        })
        }
      </div>
    )
  }

  render() {
    return (
      <div
        className="alert system"
      >
        {this.renderAlertMessage()}
      </div>
    );
  }
}

Alert.propTypes = {
  dispatch: PropTypes.func,
  session: PropTypes.object,
  system: PropTypes.object,

};

const mapStateToProps = (state) => {
  const session = state.openmrs.session;
  const system = state.openmrs.system;

  return {
    session,
    system
  };
};

export default connect(mapStateToProps)(Alert);
