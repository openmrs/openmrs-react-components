import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sessionActions from '../../features/session';
import loginActions from '../../features/login';

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
    const contextPath = window.location.href.split('/')[3];

    return (
      <div>
        <header>
          <div className="logo">
            <a href="../../referenceapplication/home.page">
              <img 
                alt="" 
                src="../../ms/uiframework/resource/uicommons/images/logo/openmrs-with-title-small.png"
              />
            </a>
          </div>

          <ul className="user-options">
            <li
              className="identifier"
              onClick={() => { this.toggleState("userDropdown"); }}
              role="button"
              style={{ cursor: "pointer" }}
              tabIndex="0"
            >
              <i className="icon-user small" />
              {this.currentUser}

              <i className="icon-caret-down appui-icon-caret-down link" />
              <i 
                className="icon-caret-up link appui-toggle"
                style={{ display: "none" }}
              />
              {this.userDropdown &&
                <ul id="user-account-menu">
                  <li>
                    <a
                      href="../../adminui/myaccount/myAccount.page"
                    >Account
                    </a>
                  </li>
                </ul>
              }

            </li>
            <li className="change-location">
              <a 
                href="#"
                onClick={() => { this.toggleState("locationDropdown"); }}
              >
                <i className="icon-map-marker small" />
                <span id="selected-location">{this.currentLocation.display}</span>

                <i className="link icon-caret-down" />
              </a>
              {this.locationDropdown &&
                <div>
                  <ul className="location-container">
                    {this.locations.map(location => (
                      <li
                        className={location.display === this.currentLocation.display ? "selected" : ""}
                        key={location.uuid}
                        onClick={() => {
                          this.setCurrentLocation(location.uuid);
                          this.toggleState("locationDropdown", false);
                        }}
                        role="button"
                      >
                        {location.display}
                      </li>
                    ))}
                  </ul>
                </div>
              }
            </li>
            <li className="logout">
              <a href={`../../appui/header/logout.action?successUrl=${contextPath}`}>
                Logout
                <i className="icon-signout small" />
              </a>
            </li>
          </ul>
        </header>
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
  currentLocation: PropTypes.shape().isRequired,
  currentUser: PropTypes.string,
  fetchCurrentSession: PropTypes.func.isRequired,
  fetchLocations: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
};

Header.defaultProps = {
  currentUser: '',
};

export default connect(mapStateToProps)(Header);
