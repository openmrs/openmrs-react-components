import React from 'react';
import { Button } from 'react-bootstrap';
import withFormContext from './withFormContext';

const Cancel = (props) => {

  return (
    <Button
      bsSize="large"
      bsStyle="danger"
      disabled={props.context.submitting}
      onClick={() => props.context.reset() && (props.onClick && props.onClick())}
    >
      Cancel
    </Button>
  );
};

export default withFormContext(Cancel);
