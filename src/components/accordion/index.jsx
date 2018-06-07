import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/css/accordion.css';
import Arrow from '../../../assets/images/arr-right.svg';

class Accordion extends React.Component {
  state = {
    isVisible: this.props.open === undefined ? false : this.props.open,
  };

  render() {
    return (
      <div className={`accordion ${this.props.border ? 'border' : ''}`}>
        <div
          className="header"
          onClick={() => {
            this.setState(() => ({ isVisible: !this.state.isVisible }));
          }}
          role="button"
          tabIndex={0}
        >
          <a>
            <span>
              <img
                className={`${this.state.isVisible ? 'rotate90' : ''}`}
                height="12px"
                src={Arrow}
                width="12px"
              />
            </span>&nbsp;&nbsp;
            {this.props.title}
          </a>
        </div>
        <div className={`content ${!this.state.isVisible ? 'close' : 'open'}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}


Accordion.propTypes = {
  border: PropTypes.bool,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Accordion.defaultProps = {
  open: false,
  border: false,
};

export default Accordion;
