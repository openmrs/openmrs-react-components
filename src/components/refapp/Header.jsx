import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {

  componentWillMount() {
    this.props.dispatch({ type: "SESSION_FETCH_REQUESTED" });
  }

  render() {
    return (
      <div>
        <header>
          { this.props.session && this.props.session.sessionLocation ? this.props.session.sessionLocation.display : ''}
        </header>
      </div>
    );
  };
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};


export default connect( ( { openmrs: { session } } ) => (  { session: session } ))(Header);
