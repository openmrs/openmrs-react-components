import React from 'react';
import { connect } from 'react-redux';

import { fetchCurrentSession } from '../../actions/sessionActions';

class Header extends React.Component {

  componentWillMount() {
    this.props.fetchCurrentSession();
  }

  render() {
    return (
      <div>
        <header>
          { this.props.session && this.props.session.sessionLocation ? this.props.session.sessionLocation.display : ''}
        </header>
      </div>
    )};
}


export default connect( ( {openmrs: { session } } ) => (  { session: session } ), { fetchCurrentSession })(Header);
