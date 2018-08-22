import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
//import { sessionActions } from '../../features/session';

export class LocationMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavDropdown eventkey={1}
        //title={this.props.title}
        //id="dropdown"
        //noCaret={this.props.noCaret}
      >
        {/*this.props.locations.map(location => (
          <MenuItem key={location.uuid}
                    onSelect={() => {
                      this.props.dispatch(sessionActions.setSessionLocation(location.uuid));
                    }}
          >
            {location.display}
          </MenuItem>))
        */}
      </NavDropdown>

    );
  }
}

export default LocationMenu;
