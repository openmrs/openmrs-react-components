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

const mapStateToProps = (state) => {
  return { session: state.openmrs.session };
};

export default connect(mapStateToProps)(Header);
