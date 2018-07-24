import React from 'react';
import PropTypes from 'prop-types';

const contextPath = window.location.href.split('/')[3];

const View = props => (
  <header>
    <div className="logo">
      <a href="../../referenceapplication/home.page">
        <img src="../../ms/uiframework/resource/uicommons/images/logo/openmrs-with-title-small.png" alt="" />
      </a>
    </div>

    <ul className="user-options">
      <li
        role="button"
        tabIndex="0"
        className="identifier"
        style={{ cursor: "pointer" }}
        onClick={() => { props.toggleState("userDropdown"); }}
      >
        <i className="icon-user small" />
        {props.currentUser}

        <i className="icon-caret-down appui-icon-caret-down link" /><i className="icon-caret-up link appui-toggle" style={{ display: "none" }} />
        {props.userDropdown &&
          <ul id="user-account-menu">
            <li>
              <a
                href="../../adminui/myaccount/myAccount.page">Account
              </a>
            </li>
          </ul>
        }

      </li>
      <li className="change-location">
        <a href="#" onClick={() => { props.toggleState("locationDropdown"); }}>
          <i className="icon-map-marker small" />
          <span id="selected-location">{props.currentLocation.display}</span>

          <i className="link icon-caret-down" />
        </a>
        {props.locationDropdown &&
          <div>
            <ul className="location-container">
              {props.locations.map(location => (
                <li
                  role="button"
                  key={location.uuid}
                  onClick={() => {
                    props.setCurrentLocation(location.uuid);
                    props.toggleState("locationDropdown", false);
                  }}
                  className={location.display === props.currentLocation.display ? "selected" : ""}
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
);

View.propTypes = {
  currentLocation: PropTypes.shape().isRequired,
  currentUser: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  toggleState: PropTypes.func.isRequired,
  userDropdown: PropTypes.bool,
  locationDropdown: PropTypes.bool,
};

View.defaultProps = {
  userDropdown: false,
  locationDropdown: false,
};

export default View;
