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

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }
  render() {
    const props = this.props;
    const contentCols = props.patient ? 10 : 12;
    const colWidth = props.patient ? '55%' : '100%';

    return (
      <div
        className="ag-theme-material"
        id="outer-container"
      >
        <ReduxToastr
          closeOnToastrClick
          timeOut={1000}
        />
        <Grid fluid>
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
              patient={props.patient}
              showBackButton={props.path === '/screening' ? true : false}
            />
            }
          </Row>
          {this.state.width > 600 ? (props.patient && props.leftRail &&
          <Row className="basic-layout">
            <Col className="basic-layout left-rail">
              {React.cloneElement(props.leftRail, { patient: props.patient })}
            </Col>
            <Col
              className="basic-layout auth-route"
              lg={contentCols}
              md={contentCols}
              sm={contentCols}
              style={{ width: colWidth }}
              xs={contentCols}
            >
              <AuthenticatedRoute {...props} />
            </Col>
          </Row>
          ) :  
            (props.path === '/screening' ? React.cloneElement(props.leftRail, { patient: props.patient }) : <AuthenticatedRoute {...props} />)}
        </Grid>
      </div>
    );
  }
};

BasicLayout.propTypes = {
  identifierTypesToDisplay: PropTypes.array,
  leftRail: PropTypes.object,
  navMenuPages: PropTypes.object,
  patient: PropTypes.object,
  patientHeaderShowBackButton: PropTypes.bool,
  userMenuPages: PropTypes.object,

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(BasicLayout);

