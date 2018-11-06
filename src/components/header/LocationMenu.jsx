import React from 'react';
import { NavDropdown, NavItem } from 'reactstrap';
import { sessionActions } from '../../features/session';

export class LocationMenu extends React.Component {

  render() {
    var locations_array = this.props.locations.filter(location => location.uuid !== this.props.sessionLocation.uuid);
    return (
      <NavDropdown
        title={this.props.title}
        id="dropdown"
        noCaret={this.props.noCaret}
        onSelect={this.props.onSelect}
      >
        {locations_array.map(location => (
          <NavItem key={location.uuid}
                    onSelect={() => {
                      this.props.dispatch(sessionActions.setSessionLocation(location.uuid));
                    }}
          >
            {location.display}
          </NavItem>))
        }
      </NavDropdown>

    );
  }
}

export default LocationMenu;
