import React from 'react';
import { ButtonGroup as ReactStrapButtonGroup, Button } from 'reactstrap';
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
    <ReactStrapButtonGroup type="radio" justified={true} {...input}>
      {options.map(option =>
        <Button
          key={option.uuid}
          style={buttonStyle}
          value={option.uuid}
        >
          {option.name || option.display}
        </Button>
      )}
    </ReactStrapButtonGroup>
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
