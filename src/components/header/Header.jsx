import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SESSION_ACTIONS } from "../../actions/types";

// TODO the idea here is that this will render the Ref App-style header, but obviously very much a work-in-progress at this time!

class Header extends React.Component {

  // TODO do I really need this?
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

const mapStateToProps = (state) => {
  return { session: state.openmrs.session };
};

export default connect(mapStateToProps)(Header);
