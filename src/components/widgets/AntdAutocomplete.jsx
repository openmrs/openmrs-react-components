import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

const AutocompleteComponent = props => {

  const dataSource = props.dataSource;
  const onSelect = props.onSelect;
  const handleSearch = props.handleSearch;
  const placeholder = props.placeholder;
  const style = props.style;

  return (
    <AutoComplete
      dataSource={dataSource}
      onSearch={handleSearch}
      onSelect={onSelect}
      placeholder={placeholder}
      style={style}
    />
  );
};

AutocompleteComponent.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.string),
  handleSearch: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object
};


export default AutocompleteComponent;
