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
              {this.props.currentUser}

              <i className="icon-caret-down appui-icon-caret-down link" />
              <i 
                className="icon-caret-up link appui-toggle"
                style={{ display: "none" }}
              />
              {this.state.userDropdown &&
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
                <span id="selected-location">{this.props.currentLocation.display}</span>

                <i className="link icon-caret-down" />
              </a>
              {this.state.locationDropdown &&
                <div>
                  <ul className="location-container">
                    {this.props.locations.map(location => (
                      <li
                        className={location.display === this.props.currentLocation.display ? "selected" : ""}
                        key={location.uuid}
                        onClick={() => {
                          // this.props.setCurrentLocation(location.uuid);
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
  const { currentLocation, currentUser } = state.session;
  const { locationTags } = state.loginLocations;
  return {
    currentLocation,
    currentUser,
    locations: locationTags,
  };
};

Header.propTypes = {
  currentLocation: PropTypes.shape().isRequired,
  currentUser: PropTypes.string,
  locations: PropTypes.array.isRequired,
  // TODO: Add setCurrentLocation functionality,
};

Header.defaultProps = {
  currentUser: '',
};

export default connect(mapStateToProps)(Header);
