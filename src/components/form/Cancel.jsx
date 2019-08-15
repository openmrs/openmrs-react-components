import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import withFormContext from './withFormContext';

const Cancel = (props) => {

  return (
    <Button
      bsStyle="danger"
      disabled={props.formContext.submitting}
      onClick={() => props.formContext.reset() && (props.onClick && props.onClick())}
      style={props.style}
    >
      <FormattedMessage
        id="reactcomponents.cancel"
        defaultMessage="Cancel" />
    </Button>
  );
};

export default withFormContext(Cancel);
