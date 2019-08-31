import React from 'react';
import PropTypes from 'prop-types';

import Upload from 'antd/es/upload';
import 'antd/es/upload/style';

import Icon from 'antd/es/icon';
import 'antd/es/icon/style';

const { Dragger } = Upload;

const UploadComponent = props => {

  const action = props.action;
  const onChange = props.onChange;

  const params = {
    name: 'file',
    multiple: true,
    // this is the endpoint
    action: action,
        
    onChange: onChange
  };

  return (
    <Dragger {...params}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload!
      </p>
    </Dragger>

  );
};

UploadComponent.propTypes = {
  action: PropTypes.string,
  onChange: PropTypes.func,
};


export default UploadComponent;
