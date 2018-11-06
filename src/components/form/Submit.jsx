import React from 'react';
import { Button } from 'reactstrap';
import withFormContext from './withFormContext';

const Submit = (props) => {

  return (
    <Button
      bsSize="large"
      bsStyle="success"
      disabled={props.formContext.submitting || !props.formContext.valid}
      //onClick={() => props.onClick && props.onClick()}
      type="submit"
    >
      Submit
    </Button>
  );
};

export default withFormContext(Submit);
