import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import AuthenticatedRoute from '../routes/AuthenticatedRoute';
import HeaderAlt from '../header/HeaderAlt';
import PatientHeader from '../header/PatientHeader';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectors } from '../../store';
import '../../../assets/css/basicLayout.css';

class BasicLayout extends React.Component {
  render() {
    const { PatientAlert, SystemAlert } = this.props;
    return (
      <div
        className="ag-theme-material"
        id="outer-container"
      >
        <ReduxToastr
          closeOnToastrClick
          timeOut={1000}
        />
        <div >
          <div className="header-panel scroll-disabled">
            {SystemAlert &&
              (
                <Row>
                  <SystemAlert />
                </Row>
              )
            }
            <Row className="header-alt-row">
              <HeaderAlt
                className="HeaderAlt"
                logo={this.props.logo}
                smallWidthLogo={this.props.smallWidthLogo}
                navMenuPages={this.props.navMenuPages}
                userMenuPages={this.props.userMenuPages}
              />
            </Row>
            <Row>
              {this.props.patient && 
              <PatientHeader
                identifierTypesToDisplay={this.props.identifierTypesToDisplay}
                identifiersToDisplay={this.props.identifiersToDisplay}
                patient={this.props.patient}
                showBackButton={this.props.path === '/screening' ? true : false}
                backLink={this.props.location}
              />
              }
            </Row>
            {PatientAlert &&
              (
              <Row>
                {this.props.patient && 
                  <span>
                    <PatientAlert />
                  </span>
                }
              </Row>
              )
            }
          </div>
          <div style={{ padding: '7px', overflowY: 'scroll'}}>
            <AuthenticatedRoute {...this.props} />
          </div>
        </div>
      </div>
    );
  }
};

BasicLayout.propTypes = {
  identifierTypesToDisplay: PropTypes.array,
  identifiersToDisplay: PropTypes.func,
  navMenuPages: PropTypes.object,
  patient: PropTypes.object,
  patientHeaderShowBackButton: PropTypes.bool,
  userMenuPages: PropTypes.object,

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    location: state.screening.LAST_SCREENING_QUEUE
  };
};

export default connect(mapStateToProps)(BasicLayout);

