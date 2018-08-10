import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../../assets/css/header.css';
import { sessionActions } from '../../features/session';
import { loginActions } from '../../features/login';
import { headerActions } from '../../features/header';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDropdown: false,
      locationDropdown: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(sessionActions.fetchSession());
    this.props.dispatch(loginActions.getLoginLocations());
    this.props.dispatch(headerActions.getHeaderLogoLinks());
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
            <a href={`/${contextPath}${this.props.logoLinkUrl}`}>
              <img 
                alt="" 
                src={`/${contextPath}${this.props.logoIconUrl}`}
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
              {this.props.user.display}

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
                <span id="selected-location">{this.props.sessionLocation.display}</span>

                <i className="link icon-caret-down" />
              </a>
              {this.state.locationDropdown &&
                <div>
                  <ul className="location-container">
                    {this.props.locations.map(location => (
                      <li
                        className={location.display === this.props.sessionLocation.display ? "selected" : ""}
                        key={location.uuid}
                        onClick={() => {
                          this.props.dispatch(sessionActions.setSessionLocation(location.uuid));
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
              <a href={`/${contextPath}/appui/header/logout.action?successUrl=${contextPath}`}>
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
  const { sessionLocation, user } = state.openmrs.session;
  const { list } = state.openmrs.loginLocations;
  const { logoLinkUrl, logoIconUrl } = state.openmrs.header.headerLogoLinks;
  
  return {
    sessionLocation,
    logoLinkUrl,
    logoIconUrl,
    user,
    locations: list,
  };
};

Header.propTypes = {
  locations: PropTypes.array.isRequired,
  logoIconUrl: PropTypes.string,
  logoLinkUrl: PropTypes.string,
  sessionLocation: PropTypes.shape({ display: PropTypes.string }),
  user: PropTypes.shape({ display: PropTypes.string })
};

Header.defaultProps = {
  locations: [],
  sessionLocation: {
    display: '',
  },
  user: { display: '' },
  logoLinkUrl: "/referenceapplication/home.page",
  logoIconUrl: "/ms/uiframework/resource/uicommons/images/logo/openmrs-with-title-small.png",
};

export default connect(mapStateToProps)(Header);
