import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../assets/css/headerAlt.css';
import NavBarMenu from './NavBarMenu';
import LocationMenu from './LocationMenu';


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
    this.setState(() => ({ expanded: false}));
  }


  render() {
    return (
      <Navbar
        className="header"
        fixedTop
        onToggle={this.handleToggle}
      >
        <Navbar.Toggle>
          <FontAwesomeIcon icon="caret-down" size="2x" id='navbarIcon'/>
        </Navbar.Toggle>
        <Navbar.Collapse in={this.state.expanded}>
          <Navbar.Header>
            <Nav pullLeft id="nav">
              <NavBarMenu
                pathname={this.props.pathname}
                pageOptions={this.props.navMenuPages}
                title={<FontAwesomeIcon icon="bars" size="2x" id='navbarIcon'/>}
                noCaret
                onSelect={this.handleSelect}
              />
              <NavItem
                href={"#/"}
                onSelect={this.handleSelect}
              >
                <img
                  className="logo"
                  alt=""
                  src={this.props.logo}
                />
              </NavItem>
            </Nav>
          </Navbar.Header>

          <Nav pullRight id="nav">
            <LocationMenu
              id="dropdown"
              locations={this.props.locations ? this.props.locations : []}
              sessionLocation={this.props.sessionLocation}
              onSelect={this.handleSelect}
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
              onSelect={this.handleSelect}
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
