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

  const zeroPadding = {
    paddingLeft: '0px',
    paddingRight: '0px'
  };

  return (
    <div id="outer-container" className="ag-theme-material">
      <ReduxToastr
        closeOnToastrClick
        timeOut={1000}
      />
      <Grid fluid={true}>
        <Row style={{marginBottom:60}}>
          <HeaderAlt
            className="HeaderAlt"
            logo={props.logo}
            userMenuPages={props.userMenuPages}
            navMenuPages={props.navMenuPages}
          />
        </Row>
        <Row>
          {props.patient &&
          <PatientHeader
            identifierTypesToDisplay={props.identifierTypesToDisplay}
            patient={props.patient}/>
          }
        </Row>
        <Row>
          {props.patient && props.leftRail &&
          <Col xs={2} sm={2} md={2} lg={2} style={ zeroPadding }>
            {React.cloneElement(props.leftRail, { patient: props.patient })}
          </Col>
          }
          <Col xs={contentCols} sm={contentCols} md={contentCols} lg={contentCols}>
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

