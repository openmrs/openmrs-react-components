import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import AuthenticatedRoute from '../routes/AuthenticatedRoute';
import HeaderAlt from '../header/HeaderAlt';
import PatientHeader from '../header/PatientHeader';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectors } from '../../store';
import '../../../assets/css/basicLayout.css';

const BasicLayout = props => {

  const contentCols = props.patient ? 10 : 12;


  const colWidth = props.patient ? '55%' : '100%';

  return (
    <div id="outer-container" className="ag-theme-material">
      <ReduxToastr
        closeOnToastrClick
        timeOut={1000}
      />
      <Grid fluid={true}>
        <Row className="header-alt-row">
          <HeaderAlt
            className="HeaderAlt"
            logo={props.logo}
            navMenuPages={props.navMenuPages}
            userMenuPages={props.userMenuPages}
          />
        </Row>
        <Row>
          {props.patient &&
          <PatientHeader
            identifierTypesToDisplay={props.identifierTypesToDisplay}
            patient={props.patient}/>
          }
        </Row>
        <Row className="basic-layout">
          {props.patient && props.leftRail &&
          <Col className="basic-layout left-rail">
            {React.cloneElement(props.leftRail, { patient: props.patient })}
          </Col>
          }
          <Col xs={contentCols} sm={contentCols} md={contentCols} style={{ width: colWidth }} lg={contentCols} className="basic-layout auth-route">
            <AuthenticatedRoute {...props} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

BasicLayout.propTypes = {
  identifierTypesToDisplay: PropTypes.array,
  leftRail: PropTypes.object,
  navMenuPages: PropTypes.object,
  patient: PropTypes.object,
  userMenuPages: PropTypes.object

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(BasicLayout);

