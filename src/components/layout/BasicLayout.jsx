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
    this.layoutToDisplay = this.layoutToDisplay.bind(this);
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

  layoutToDisplay(contentCols, colWidth) {
    if (this.state.width < 600) {
      if (this.props.path === '/screening') {
        if (this.props.patient && this.props.leftRail) {
          return React.cloneElement(this.props.leftRail, { patient: this.props.patient });
        }
      } else {
        return <AuthenticatedRoute {...this.props} />;
      }
    } else {
      if (this.props.path === '/screening') {
        return (<Row className="basic-layout">
          {this.props.patient && this.props.leftRail &&
          <Col className="basic-layout left-rail">
            {React.cloneElement(this.props.leftRail, { patient: this.props.patient })}
          </Col>
          }
        </Row>);
      } else {
        return (
          <Row className="basic-layout">
            {
              this.props.patient && this.props.leftRail &&
              <Col className="basic-layout left-rail">
                {React.cloneElement(this.props.leftRail, { patient: this.props.patient })}
              </Col>
            }
            <Col
              className="basic-layout auth-route"
              lg={contentCols}
              md={contentCols}
              sm={contentCols}
              style={{ width: colWidth }}
              xs={contentCols}
            >
              <AuthenticatedRoute {...this.props} />
            </Col>
          </Row>);
      }

    }
  }

  render() {
    const contentCols = this.props.patient ? 10 : 12;
    const colWidth = this.props.patient ? '55%' : '100%';

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
              logo={this.props.logo}
              navMenuPages={this.props.navMenuPages}
              userMenuPages={this.props.userMenuPages}
            />
          </Row>
          <Row>
            {this.props.patient && 
            <PatientHeader
              identifierTypesToDisplay={this.props.identifierTypesToDisplay}
              patient={this.props.patient}
              showBackButton={this.state.width < 600 && this.props.path === '/screening' ? true : false}
            />
            }
          </Row>
          {this.layoutToDisplay(contentCols, colWidth)}
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

