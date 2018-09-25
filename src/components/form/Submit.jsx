import React from 'react';
import { Button } from 'react-bootstrap';
import FormContext from './FormContext';

const Submit = (props) => {

  return (
    <FormContext.Consumer>
      {context =>
        <Button
          bsSize="large"
          bsStyle="success"
          disabled={context.submitting}
          //onClick={() => props.onClick && props.onClick()}
          type="submit"
        >
          Submit
        </Button>
      }
    </FormContext.Consumer>
  );
};

export default Submit;
