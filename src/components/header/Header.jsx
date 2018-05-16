import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SESSION_ACTIONS } from "../../actions/types";

class Header extends React.Component {

  componentWillMount() {
    this.props.dispatch({ type: SESSION_ACTIONS.FETCH_REQUESTED });
  }

  render() {
    return (
      <div>
        <header>
          { this.props.session.user ? this.props.session.user.display : '' }
        </header>
      </div>
    );
  };
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

// TODO convert this to a mapStateToProps that looks cleaner
export default connect( ( { openmrs: { session } } ) => (  { session: session } ))(Header);
