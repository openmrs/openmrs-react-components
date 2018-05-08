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
          test { this.props.session ? this.props.session.location : ''} out
        </header>
      </div>
    )};
}


export default connect( ({ session }) => ({ session }), { fetchCurrentSession })(Header);
