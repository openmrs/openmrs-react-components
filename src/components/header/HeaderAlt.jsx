import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../assets/css/headerAlt.css';
import NavBarMenu from './NavBarMenu';
import LocationMenu from './LocationMenu';


export class HeaderAlt extends React.Component {

  render() {
    return (
      <Navbar className="header" fixedTop >
        <Navbar.Header>
          <Nav pullLeft id="nav">
            <NavBarMenu
              pathname={this.props.pathname}
              pageOptions={this.props.navMenuPages}
              title={<FontAwesomeIcon icon="bars" size="2x" id='navbarIcon'/>}
              noCaret={true}
            />
            <NavItem href={"#/"}>
              <img
                className="logo"
                alt=""
                src={this.props.logo}
              />
            </NavItem>
          </Nav>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight id="nav">
            <LocationMenu
              id="dropdown"
              locations={this.props.locations ? this.props.locations : []}
              sessionLocation={this.props.sessionLocation}
              dispatch={this.props.dispatch}
              title={
                <span>
                  <FontAwesomeIcon icon="map-marker" size="lg" id="navItemIcon"/>
                  {this.props.sessionLocation.display}
                </span>
              }
            />
            <NavBarMenu
              pathname={this.props.pathname}
              pageOptions={this.props.userMenuPages}
              id="dropdown"
              title={
                <span>
                  <FontAwesomeIcon icon="user" size="lg" id="navItemIcon"/>
                  {this.props.user.person ? this.props.user.person.display : 'user'}
                </span>
              }
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  const { sessionLocation, user } = state.openmrs.session;
  const { list } = state.openmrs.loginLocations;
  const { pathname } = state.router.location;

  return {
    sessionLocation,
    user,
    locations: list,
    pathname
  };
};

HeaderAlt.propTypes = {
  locations: PropTypes.array.isRequired,
  sessionLocation: PropTypes.shape({ display: PropTypes.string }),
  user: PropTypes.shape({ display: PropTypes.string }),
  pathname: PropTypes.string
};

HeaderAlt.defaultProps = {
  locations: [],
  sessionLocation: {
    display: '',
  },
  user: { display: '' },
  pathname: ''
};

export default connect(mapStateToProps)(HeaderAlt);
