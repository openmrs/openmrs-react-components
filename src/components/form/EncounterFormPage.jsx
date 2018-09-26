import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { visitActions } from "../../features/visit";
import Submit from './Submit';
import Cancel from './Cancel';
import EncounterForm from './EncounterForm';
import encounterByEncounterTypeFilter from '../../domain/encounter/filters/encountersByEncounterTypeFilter';

/**
 * Provides a basic wrapper around an Encounter Form with a title, toast success message, and afterSubmitLink
 */



class EncounterFormPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.enterEditMode = this.enterEditMode.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // TODO we may not *always* want to pull in the encounter here?  make a flag about this?
    // TODO what if there are multiple encounters of the same type?  this currently just shifts in the "first"
    if (props.patient && props.patient.visit && props.patient.visit.encounters) {
      this.encounter = encounterByEncounterTypeFilter(props.encounterType.uuid)(props.patient.visit.encounters).shift();
    }

    this.state = {
      mode: props.mode ? props.mode : (this.encounter ? 'view' : 'edit')  // if no mode specified, base on whether there's an existing encounter
    };

    this.formSubmittedActionCreators = [
      () => toastrActions.add({ title: "Data Saved", type: "success" }),
      () => props.patient && props.patient.uuid && visitActions.fetchPatientActiveVisit(props.patient.uuid),
      () => push(props.afterSubmitLink)
    ];

    // TODO extract styles out to a common location once we figure out our strategy for css?
    // TODO or potentially assign defaults here but allow to be overridden via props?
    this.rowStyles = {
      backgroundColor: '#ffa500b3'
    };

    this.littlePaddingLeft = {
      paddingLeft: '20px'
    };

    this.divContainer = {
      paddingLeft: '0px',
      paddingRight: '0px'
    };

    this.colHeight = {
      height: '40px'
    };
  }

  enterEditMode() {
    this.setState({
      mode: 'edit'
    });
  }

  exitEditMode() {
    this.setState({
      mode: 'view'
    });
  }

  handleCancel() {
    this.exitEditMode();
    if (this.props.backLink) {
      this.props.dispatch(push(this.props.backLink));
    }
  }

  render() {
    return (
      <div style={this.divContainer}>
        <Grid style={this.divContainer}>
          <Row style={this.rowStyles}>
            <Col sm={20} md={20} style={this.littlePaddingLeft}>
              <span><h1>{this.props.title}</h1></span>
            </Col>
          </Row>
          <Row>
            <Col sm={20} md={20} style={this.colHeight}>
              <span><h1>{''}</h1></span>
            </Col>
          </Row>
        </Grid>
        <div>
          <EncounterForm
            formId={this.props.formId}
            defaultValues={this.props.defaultValues}
            encounter={this.encounter}
            encounterType={this.props.encounterType}
            mode={this.state.mode}
            formSubmittedActionCreator={this.formSubmittedActionCreators}
            patient={this.props.patient}
            visit={this.props.patient ? this.props.patient.visit : null}
          >
            {this.props.formContent}
            <Grid>
              <Row>
                <Col sm={2} xsOffset={2}>
                  { this.state.mode === 'edit' ?
                    (<Cancel onClick={this.handleCancel}/>)
                    : (null)
                  }
                </Col>
                <Col sm={2} xsOffset={1}>
                  {this.state.mode === 'edit' ?
                    (<Submit onClick={this.exitEditMode}/>) :
                    (<Button onClick={this.enterEditMode} bsSize="large">Edit</Button>)
                  }
                </Col>
              </Row>
            </Grid>
          </EncounterForm>
        </div>
      </div>
    );
  }
}

EncounterFormPage.propTypes = {
  afterSubmitLink: PropTypes.string,
  backLink: PropTypes.string,
  defaultValues: PropTypes.array,
  encounterType: PropTypes.object.isRequired,
  formContent: PropTypes.object.isRequired,
  formId: PropTypes.string.isRequired,
  mode: PropTypes.string,
  patient: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  visit: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null,
  };
};

export default connect(mapStateToProps)(EncounterFormPage);
