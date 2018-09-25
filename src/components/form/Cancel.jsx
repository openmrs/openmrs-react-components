import React from 'react';
import { Button } from 'react-bootstrap';
import FormContext from './FormContext';

const Cancel = (props) => {

  return (
    <FormContext.Consumer>
      {context =>
        <Button
          bsSize="large"
          bsStyle="danger"
          disabled={context.submitting}
          onClick={() => context.reset() && (props.onClick && props.onClick())}
        >
          Cancel
        </Button>
      }
    </FormContext.Consumer>
  );
};

export default Cancel;
