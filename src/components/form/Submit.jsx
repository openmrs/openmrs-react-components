import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import withFormContext from './withFormContext';

const Submit = (props) => {

  return (
    <Button
      bsStyle="success"
      disabled={props.formContext.submitting || !props.formContext.valid}
      //onClick={() => props.onClick && props.onClick()}
      style={props.style}
      type="submit"
    >
      <FormattedMessage
        id="reactcomponents.submit"
        defaultMessage="Submit" />
    </Button>
  );
};

export default withFormContext(Submit);
