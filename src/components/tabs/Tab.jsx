import React from 'react';
import PropTypes from 'prop-types';

class Tab extends React.Component {

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const { 
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active tab-list-border';
    }

    return (
      <li 
        className={className}
        onClick={onClick}
      >
        {label}
      </li>
    );
  }
}


Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
