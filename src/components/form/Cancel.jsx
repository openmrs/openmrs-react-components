import React from 'react';
import { Button } from 'react-bootstrap';
import LocalizedMessage from '../localization/LocalizedMessage';
import withFormContext from './withFormContext';

const Cancel = (props) => {

  return (
    <Button
      bsStyle="danger"
      disabled={props.formContext.submitting}
      onClick={() => props.formContext.reset() && (props.onClick && props.onClick())}
      style={props.style}
    >
      <LocalizedMessage
        id="reactcomponents.cancel"
        defaultMessage="Cancel"
      />
    </Button>
  );
};

export default withFormContext(Cancel);
