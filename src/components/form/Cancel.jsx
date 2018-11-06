import React from 'react';
import { Button } from 'reactstrap';
import withFormContext from './withFormContext';

const Cancel = (props) => {

  return (
    <Button
      bsSize="large"
      bsStyle="danger"
      disabled={props.formContext.submitting}
      onClick={() => props.formContext.reset() && (props.onClick && props.onClick())}
    >
      Cancel
    </Button>
  );
};

export default withFormContext(Cancel);
