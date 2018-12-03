import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../assets/css/headerAlt.css';
import NavBarMenu from './NavBarMenu';
import MenuBar from './Menubar';
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


  render() {
    return (
      <Col>
        <Row style={{ height:60 }}>
          <Navbar
            className="header"
            fixedTop
            onToggle={this.handleToggle}
          >
            <Navbar.Toggle>
              <FontAwesomeIcon
                icon="caret-down"
                id='navbarIcon'
                size="2x"
              />
            </Navbar.Toggle>
            <Navbar.Collapse in={this.state.expanded}>
              <Navbar.Header>
                <Nav
                  id="nav"
                  pullLeft
                >
                  <MenuBar
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
                      {this.props.sessionLocation.display}
                    </span>
                  }
                />
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
                      {this.props.user.person ? this.props.user.person.display : 'user'}
                    </span>
                  }
                />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Row style={{ height:42 }}>
          <SlidingNavMenu
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
