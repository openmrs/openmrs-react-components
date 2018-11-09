import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import '../../../assets/css/widgets.css';
import formUtil from '../../features/form/util';

const buttonStyle = {
  whiteSpace: "normal"
};

const ButtonGroup = ({
  displayValue,
  input,
  mode,
  options
}) => {

  const edit = (
    <ToggleButtonGroup type="radio" justified={true} {...input}>
      {options.map(option =>
        <ToggleButton
          key={option.uuid}
          style={buttonStyle}
          value={option.uuid}
        >
          {option.name || option.display}
        </ToggleButton>
      )}
    </ToggleButtonGroup>
  );

  const view = (
    <span
      className="button-group-view"
      style={{}}
    >
      {formUtil.conceptAnswerDisplay(displayValue, options)}
    </span>
  );

  return (
    <div>
      {!mode || mode === 'edit' ? edit : view}
    </div>
  );

};

export default ButtonGroup;
