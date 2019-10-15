import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/css/toolTip.css';

const ToolTip = ({ toolTipHeader, toolTipBody }) => (
  <span className="tooltip-text">
    {toolTipHeader && <p>{ toolTipHeader }</p>}
    <div>
      {toolTipBody && toolTipBody.map((message, index) => (
        <span key={index}>{message}</span>
      ))}
    </div>
  </span>
);

ToolTip.propTypes = {
  toolTipBody: PropTypes.arrayOf(PropTypes.string),
  toolTipHeader: PropTypes.string
};

export default ToolTip;
