import React from "react";
import { Form, FormGroup, FormControl, ControlLabel, Label, Col } from 'react-bootstrap';

class InfoPatient extends React.Component {

  render() {
    return (
      <div>
        <h3><Label>Patient Info</Label></h3>
        <Form horizontal>

          <FormGroup controlId="formPatientId">
            <Col componentClass={ControlLabel} sm={2}>
              Id
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="Id" value={this.props.patient.id} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPatientUuid">
            <Col componentClass={ControlLabel} sm={2}>
              UUID
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="patientUuid" value={this.props.patient.uuid} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPatientIdentifier">
            <Col componentClass={ControlLabel} sm={2}>
              Identifier
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="patientIdentifier" value={this.props.patient.identifier} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPatientFirstName">
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="firstName" value={this.props.patient.firstName} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPatientLastName">
            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="lastName" value={this.props.patient.lastName} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPatientGender">
            <Col componentClass={ControlLabel} sm={2}>
              Gender
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="gender" value={this.props.patient.gender} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPatientAge">
            <Col componentClass={ControlLabel} sm={2}>
              Age
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="age" value={this.props.patient.age} />
            </Col>
          </FormGroup>

        </Form>

      </div>
    );
  }
}

export default InfoPatient;