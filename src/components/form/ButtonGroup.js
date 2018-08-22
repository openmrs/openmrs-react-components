import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const ButtonGroup = ({ input, options }) => (

  <ToggleButtonGroup type="radio" justified={true} {...input}>
    { options.map( option =>
      <ToggleButton key={ option.uuid } value={option.uuid}>{ option.name }</ToggleButton>
    )}
  </ToggleButtonGroup>

);

export default ButtonGroup;
