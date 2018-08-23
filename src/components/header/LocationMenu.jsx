import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { sessionActions } from '../../features/session';

export class LocationMenu extends React.Component {

  render() {
    var locations_array = this.props.locations.filter(location => location.uuid !== this.props.sessionLocation.uuid);
    return (
      <NavDropdown
        title={this.props.title}
        id="dropdown"
        noCaret={this.props.noCaret}
      >
        {locations_array.map(location => (
          <MenuItem key={location.uuid}
                    onSelect={() => {
                      this.props.dispatch(sessionActions.setSessionLocation(location.uuid));
                    }}
          >
            {location.display}
          </MenuItem>))
        }
      </NavDropdown>

    );
  }
}

export default LocationMenu;
