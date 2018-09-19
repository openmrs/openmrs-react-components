import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const DropDown = ({ input, options }) => {
  return (
    <DropdownButton
      title='Blood group'
      {...input}
    >
      { options.map( option =>
        (
          <MenuItem
            key={option.uuid}
            value={option.uuid}
          >
            { option.name }
          </MenuItem>)
      )}
    </DropdownButton>

  );};

export default DropDown;
