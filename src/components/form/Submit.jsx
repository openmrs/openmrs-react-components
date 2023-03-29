import React from 'react';
import { Button } from 'react-bootstrap';
import LocalizedMessage from '../localization/LocalizedMessage';
import withFormContext from './withFormContext';
import PropTypes from "prop-types";

const Submit = (props) => {

  return (
    <Button
      bsStyle="success"
      disabled={props.formContext.submitting || !props.formContext.valid}
      //onClick={() => props.onClick && props.onClick()}
      style={props.style}
      type="submit"
    >
      <LocalizedMessage
        id={props.labelCode}
        defaultMessage="Submit" />
    </Button>
  );
};

Submit.propTypes = {
  submitLabelCode: PropTypes.string,
};

Submit.defaultProps = {
  labelCode: "reactcomponents.submit"
};

export default withFormContext(Submit);
