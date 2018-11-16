import React from 'react';
import { Button } from 'react-bootstrap';
import withFormContext from './withFormContext';

const Cancel = (props) => {

  return (
    <Button
      bsStyle="danger"
      disabled={props.formContext.submitting}
      onClick={() => props.formContext.reset() && (props.onClick && props.onClick())}
      style={props.style}
    >
      Cancel
    </Button>
  );
};

export default withFormContext(Cancel);
