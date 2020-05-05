import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import uuidv4 from 'uuid/v4';
import { selectors } from '../../store';
import { formActions } from '../../features/form';
import { FORM_STATES } from '../../features/form/constants';
import Submit from './Submit';
import Cancel from './Cancel';
import EncounterForm from './EncounterForm';
import Loader from './../widgets/Loader';
import {format, isSameDay, parse} from "date-fns";
import LocalizedMessage from '../localization/LocalizedMessage';

/**
 * Provides a basic wrapper around an Encounter Form with a title, toast success message, and afterSubmitLink
 * Handling fetching the encounter, managing state, etc
 */

class EncounterFormPanel extends React.PureComponent {

  constructor(props) {
    super(props);
    this.enterEditMode = this.enterEditMode.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBack = this.handleBack.bind(this);

    if (this.props.formInstanceId) {
      this.formInstanceId = this.props.formInstanceId;
    }
    else {
      this.formInstanceId = uuidv4();
    }

    this.formSubmittedActionCreators = [
      () => toastrActions.add({
        title: this.props.toastMessage ? this.props.toastMessage : "Data Saved",
        type: "success"
      })
    ];

    if (props.afterSubmitLink) {
      this.formSubmittedActionCreators.push(() => push(props.afterSubmitLink));
    }

    if (props.formSubmittedActionCreators) {
      this.formSubmittedActionCreators.push(...props.formSubmittedActionCreators);
    }

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

    this.floatRight = {
      float: 'right'
    };

  }

  componentDidMount() {
    this.props.dispatch(formActions.initializeForm(this.formInstanceId, this.props.formId));
    if (this.props.encounter) {
      this.props.dispatch(formActions.loadFormBackingEncounter(this.formInstanceId, this.props.encounter.uuid));
    }
    else {
      this.props.dispatch(formActions.setFormState(this.formInstanceId, FORM_STATES.EDITING));
    }
  }

  componentDidUpdate(prevProps) {
    // load the encounter if previously there was no encounter but now one has been passed in
    if (!prevProps.encounter && !this.getForm().encounter && this.props.encounter) {
      this.props.dispatch(formActions.loadFormBackingEncounter(this.formInstanceId, this.props.encounter.uuid));
    }
    // TODO should we also reload the form if the backing encounter *changes*... ie uuids aren't equal? or is this an invalid use case?
  }

  componentWillUnmount() {
    this.props.dispatch(formActions.destroyForm(this.formInstanceId));
  }

  handleCancel() {
    if (this.getForm().state === FORM_STATES.EDITING) {
      // if no existing encounter (ie "Enter" mode) redirect to any back link
      if (!this.getForm().encounter && this.props.backLink) {
        if (typeof this.props.backLink === 'string') {
          this.props.dispatch(push(this.props.backLink));
        } else if (typeof this.props.backLink === 'function') {
          this.props.backLink();
        }
      } else {
        this.exitEditMode();
      }
    }
  }

  handleBack() {
    if (typeof this.props.backLink === 'string') {
      this.props.dispatch(push(this.props.backLink));
    } else if(typeof this.props.backLink === 'function') {
      this.props.backLink();
    }
  }
  enterEditMode() {
    this.props.dispatch(formActions.setFormState(this.formInstanceId, FORM_STATES.EDITING));
  }

  exitEditMode() {
    this.props.dispatch(formActions.setFormState(this.formInstanceId, FORM_STATES.VIEWING));
  }

  getForm() {
    return this.props.forms ? this.props.forms[this.formInstanceId] : null;
  }

  render() {
    return (
      <div style={this.divContainer}>
        <Grid fluid="true" style={this.divContainer}>
          {this.props.title &&
            <Row style={this.rowStyles}>
              <Col style={this.littlePaddingLeft}>
                <span><h2>{this.props.title}</h2></span>
              </Col>
            </Row>
          }

          {this.props.showDate &&
            <Row>
              <Col sm={2} smOffset={5}>
                <span>
                  <h2>
                    {this.getForm() && this.getForm().encounter && this.getForm().encounter.encounterDatetime
                    && (isSameDay(parse(this.getForm().encounter.encounterDatetime), new Date()) ? 'Today' : format(parse(this.getForm().encounter.encounterDatetime), 'DD MMM YYYY'))}
                  </h2>
                </span>
              </Col>
            </Row>
          }

        </Grid>

        {this.getForm() && (this.getForm().state === FORM_STATES.EDITING || this.getForm().state === FORM_STATES.VIEWING) ?
          (<div>
            <EncounterForm
              defaultValues={this.props.defaultValues}
              encounter={this.getForm().encounter}
              encounterRole={this.props.encounterRole}
              encounterType={this.props.encounterType}
              formId={this.props.formId}
              formInstanceId={this.formInstanceId}
              formSubmittedActionCreator={this.formSubmittedActionCreators}
              location={this.props.location}
              manuallyExitSubmitMode={this.props.manuallyExitSubmitMode}
              mode={this.getForm().state === FORM_STATES.EDITING ? 'edit' : 'view'}
              orderForObs={this.props.orderForObs}
              patient={this.props.patient}
              provider={this.props.provider}
              timestampNewEncounterIfCurrentDay={this.props.timestampNewEncounterIfCurrentDay}
              visit={this.props.patient ? this.props.patient.visit : null}
              visitType={this.props.visitType ? this.props.visitType : null}
            >
              {this.props.formContent}

              {!this.props.hideActionButtons &&
                (<Grid fluid={true}>
                  <Row>
                    <Col xs={6}>
                      {this.getForm().state === FORM_STATES.EDITING ?
                        <Cancel onClick={this.handleCancel} /> : <Button onClick={this.handleBack}>
                          <LocalizedMessage
                            id="reactcomponents.back"
                            defaultMessage="Back" />
                        </Button>
                      }
                    </Col>
                    {!this.props.hideSubmitActionButtons &&  <Col xs={6}>
                      {this.getForm().state === FORM_STATES.EDITING ?
                        (<Submit style={this.floatRight} onClick={this.exitEditMode}/>) :
                        (<Button style={this.floatRight} onClick={this.enterEditMode}>
                          <LocalizedMessage
                            id="reactcomponents.edit"
                            defaultMessage="Edit" />
                        </Button>)}
                    </Col>
                    }
                  </Row>
                </Grid>)
              }
            </EncounterForm>
          </div>)
          :
          (<Loader/>)
        }
      </div>
    );
  }
}

EncounterFormPanel.propTypes = {
  afterSubmitLink: PropTypes.string,
  backLink: PropTypes.any,
  defaultValues: PropTypes.array,
  encounter: PropTypes.object,
  encounterRole: PropTypes.object,
  encounterType: PropTypes.object.isRequired,
  formContent: PropTypes.object.isRequired,
  formId: PropTypes.string.isRequired,
  formInstanceId: PropTypes.string,
  formSubmittedActionCreators: PropTypes.array,
  hideActionButtons: PropTypes.bool,
  hideSubmitActionButtons: PropTypes.bool,
  location: PropTypes.object,
  manuallyExitSubmitMode: PropTypes.bool,
  orderForObs: PropTypes.object,
  patient: PropTypes.object.isRequired,
  provider: PropTypes.object,
  showDate: PropTypes.bool.isRequired,
  timestampNewEncounterIfCurrentDay: PropTypes.bool,
  title: PropTypes.string,
  toastMessage: PropTypes.string,
  visit: PropTypes.object,
  visitType: PropTypes.object
};

EncounterFormPanel.defaultProps = {
  manuallyExitSubmitMode: false,
  showDate: false,
  timestampNewEncounterIfCurrentDay: false
};

const mapStateToProps = (state, props) => {
  return {
    // if a patient is passed in, use that one, otherwise look in the store
    patient: props.patient ? props.patient : selectors.getSelectedPatientFromStore(state),
    forms: state.openmrs.form
  };
};

export default connect(mapStateToProps)(EncounterFormPanel);
