import React from 'react';
import { Button } from 'react-bootstrap';

const Submit = (props) => {

  const { submitting } = props;

  return (
    <Button
      bsStyle="success"
      disabled={submitting}
      type="submit"
    >
      Submit
    </Button>
  );
};

export default Submit;
