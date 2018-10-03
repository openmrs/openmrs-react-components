import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const buttonStyle = {
  whiteSpace: "normal"
};

const ButtonGroup = ({ input, options }) => (

  <ToggleButtonGroup type="radio" justified={true} {...input}>
    { options.map( option =>
      <ToggleButton key={ option.uuid } value={option.uuid} style={ buttonStyle }>{ option.name || option.display }</ToggleButton>
    )}
  </ToggleButtonGroup>

);

export default ButtonGroup;
