import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sessionActions from '../../features/session';
import loginActions from '../../features/login';
import View from './View';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDropdown: false,
      locationDropdown: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(sessionActions.fetchSession());
    this.props.dispatch(loginActions.getLoginLocations());
  }

  toggleState = (key, value) => {
    this.setState(() => ({
      [key]: value || !this.state[key],
    }));
  }

  render() {
    return (
      <div>
        <View
          currentLocation={this.props.currentLocation}
          currentUser={this.props.currentUser}
          locationDropdown={this.state.locationDropdown}
          locations={this.props.locations}
          setCurrentLocation={this.props.setCurrentLocation}
          toggleState={this.toggleState}
          userDropdown={this.state.userDropdown}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentLocation, currentUser } = state.sessionReducer;
  const { locationTags } = state.locationReducer;
  return {
    currentLocation,
    currentUser,
    locations: locationTags,
  };
};

Header.propTypes = {
  currentUser: PropTypes.string,
  currentLocation: PropTypes.shape().isRequired,
  fetchCurrentSession: PropTypes.func.isRequired,
  fetchLocations: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
};

Header.defaultProps = {
  currentUser: '',
};

export default connect(mapStateToProps)(Header);
