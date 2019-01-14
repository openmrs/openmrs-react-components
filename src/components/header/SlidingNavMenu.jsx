import React from "react";
import PropTypes from 'prop-types';
import '../../../assets/css/headerAlt.css';
import { Row, Nav, NavItem } from 'react-bootstrap';


class SlidingNavMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    const { pageOptions, pathname } = props;
    const pagePathArray = Object.keys(pageOptions);

    this.state = {
      activeKey: pathname,
      pagePathArray,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(path) {
    this.setState({
      activeKey: path,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pathname !== this.props.pathname) {
      this.setState({ activeKey: this.props.pathname})
    }
  }

  render() {

    const { pagePathArray, activeKey } = this.state;
    const { pageOptions } = this.props;
    
    return (
      <div className="menu-bar">
        <div className="sliding-menu">
          <Row>
            <Nav
              activeKey={activeKey}
              bsStyle="tabs"
              onSelect={this.handleSelect}
            >
              {pagePathArray.map(path => (
                <NavItem
                  eventKey={path}
                  href={"#" + path}
                  key={path}
                >
                  {pageOptions[path].display}
                </NavItem>
              ))
              }
            </Nav>
          </Row>
        </div>
      </div>
    );
  }
}

SlidingNavMenu.propTypes = {
 pageOptions: PropTypes.object.isRequired,
 pathname: PropTypes.string.isRequired,
}

export default SlidingNavMenu;
