import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as R from 'ramda';
import { differenceInMinutes } from 'date-fns';
import systemActions from '../../features/system/actions';
import '../../../assets/css/widgets.css';

class Alert extends Component {
  state = {
    display: false,
  };

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
    const serverTime = new Date(`${system.systemDate}T${system.systemTime}`);
    const hasTimeZoneOffset = serverTime.getTimezoneOffset() === deviceTime.getTimezoneOffset();
    const timeDifference = Math.abs(
      differenceInMinutes(
        serverTime,
        deviceTime
      )) ;
    const hasTimeDifference = timeDifference > 5;
    const hasConnection = system.systemConnection || navigator.onLine;

    let alertMessages = [];

    if (hasTimeZoneOffset) {
      alertMessages.push({
        message: `Your current time zone is different from the server by ${timeDifference / 60}hour(s)`,
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

    const display = (hasTimeDifference || hasTimeZoneOffset || !navigator.onLine);


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
