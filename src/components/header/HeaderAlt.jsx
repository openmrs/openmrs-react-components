import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../assets/css/headerAlt.css';
import NavBarMenu from './NavBarMenu';
import LocationMenu from './LocationMenu';
import SlidingNavMenu from './SlidingNavMenu';


export class HeaderAlt extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleToggle(expanded){
    if (this.state.expanded === expanded){
      this.setState(() => ({ expanded: !expanded }));
    }
    else {
      this.setState(() => ({ expanded: expanded }));
    }
  }

  handleSelect(){
    this.setState(() => ({ expanded: false }));
  }

  getPotraitMenuClassName() {
    const locationLength = this.props.sessionLocation.display.length;
    let navClassName = "navbar-menu portrait";

    switch (true) {
      case (locationLength > 15 && locationLength < 21): {
        navClassName = "navbar-menu portrait mid";
        break;
      }
      case (locationLength > 21 && locationLength < 25): {
        navClassName = "navbar-menu portrait semi";
        break;
      }
      case (locationLength > 25): {
        navClassName = "navbar-menu portrait long";
        break;
      }
      default: {
        break;
      }

    }
    return navClassName;
  }

  render() {

    return (
      <Col>
        <Row style={{ height:60 }}>
          <Navbar
            className="header"
            fixedTop
            onToggle={this.handleToggle}
          >
            {!this.state.expanded && <img
              alt=""
              className="header-logo full-width"
              src={this.props.logo}
            />
            }
            {!this.state.expanded && <img
              alt=""
              className="header-logo portrait"
              src={this.props.smallWidthLogo}
            />
            }

            <div className={this.getPotraitMenuClassName()}>
              <div className="location-dropdown-icon">
                <LocationMenu
                  dispatch={this.props.dispatch}
                  id="dropdown"
                  locations={this.props.locations ? this.props.locations : []}
                  onSelect={this.handleSelect}
                  sessionLocation={this.props.sessionLocation}
                  title={
                    <span>
                      <FontAwesomeIcon
                        icon="map-marker"
                        id="navItemIcon"
                        size="lg"
                      />
                      <span className="session-location-dropdown">{this.props.sessionLocation.display}</span>
                    </span>
                  }
                />
              </div>
              <div className="user-dropdown-icon">
                <NavBarMenu
                  id="dropdown"
                  onSelect={this.handleSelect}
                  pageOptions={this.props.userMenuPages}
                  pathname={this.props.pathname}
                  title={
                    <span>
                      <FontAwesomeIcon
                        icon="user"
                        id="navItemIcon"
                        size="lg"
                      />
                      <span className="current-user-dropdown">{this.props.user.display}</span>
                    </span>
                  }
                />
              </div>
            </div>
            <Navbar.Collapse in={this.state.expanded}>
              <Navbar.Header>
                <Nav
                  id="nav"
                  pullLeft
                >
                  <NavBarMenu
                    noCaret
                    onSelect={this.handleSelect}
                    pageOptions={this.props.navMenuPages}
                    pathname={this.props.pathname}
                    title={<FontAwesomeIcon
                      icon="bars"
                      id='navbarIcon'
                      size="2x"
                    />}
                  />
                  <NavItem
                    className="full-width logo"
                    href={"#/"}
                    onSelect={this.handleSelect}
                  >
                    <img
                      alt=""
                      className="logo"
                      src={this.props.logo}
                    />
                  </NavItem>
                </Nav>
              </Navbar.Header>
              <span className="navbar-menu full-wdith">
                <Nav
                  id="nav"
                  pullRight
                >
                  <LocationMenu
                    dispatch={this.props.dispatch}
                    id="dropdown"
                    locations={this.props.locations ? this.props.locations : []}
                    onSelect={this.handleSelect}
                    sessionLocation={this.props.sessionLocation}
                    title={
                      <span>
                        <FontAwesomeIcon
                          icon="map-marker"
                          id="navItemIcon"
                          size="lg"
                        />
                        <span className="session-location-dropdown">{this.props.sessionLocation.display}</span>
                      </span>
                    }
                  />
                  <span className="full-width user-display">
                    <NavBarMenu
                      id="dropdown"
                      onSelect={this.handleSelect}
                      pageOptions={this.props.userMenuPages}
                      pathname={this.props.pathname}
                      title={
                        <span>
                          <FontAwesomeIcon
                            icon="user"
                            id="navItemIcon"
                            size="lg"
                          />
                          {this.props.user.display}
                        </span>
                      }
                  
                    />
                  </span>
                  <span className="portrait user-display">
                    <NavBarMenu
                      id="dropdown"
                      onSelect={this.handleSelect}
                      pageOptions={this.props.userMenuPages}
                      pathname={this.props.pathname}
                      title={
                        <span>
                          <FontAwesomeIcon
                            icon="user"
                            id="navItemIcon"
                            size="lg"
                          />
                          <span className="current-user-dropdown">{this.props.user.display}</span>
                        </span>
                      }
                    />
                  </span>
                </Nav>
              </span>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Row style={{ height:42 }}>
          <SlidingNavMenu
            pageOptions={this.props.navMenuPages}
            pathname={this.props.pathname}
          />
        </Row>
      </Col>
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
