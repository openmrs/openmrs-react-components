import React from 'react';
// import PropTypes from 'prop-types';
import { Field } from "redux-form";
import { Form, Icon, Button, Input } from 'antd';

const FormItem = Form.Item;

export default class DynamicFieldSet extends React.Component {
  render() {
    const { fields, meta: { error, submitFailed } } = this.props;

    const keys = this.props.keys;
    // const name = this.props.name;
    // const values = this.props.values;
    // const arrayHelpers = this.props.arrayHelpers;
    let formItems = null;

    formItems = fields.map((field, index) => (
      <div>
        {keys.map((k, indexk) => (

          <Field
            component={Input}
            key={index}
            label={`${k.label || k.key}`}
            name={`${field}.${k.key}`}
            type="text"
          />
        ))}
        <Icon
          className="dynamic-delete-button"
          onClick={() => fields.remove(index)}
          type="minus-circle-o"
        />
      </div>
    ));

    return (
      <div>
        <FormItem label={this.props.label}>
          {formItems}
          <FormItem>
            <Button
              onClick={() => fields.push({})}
              style={{ width: '30%' }}
            >
              <Icon type="plus" /> {this.props.buttonText || 'Add Field'}
            </Button>
          </FormItem>
        </FormItem>
      </div>
    );
  }
}

// DynamicFieldSet.propTypes = {
//   name: PropTypes.string,
//   label: PropTypes.string,
//   values: PropTypes.array,
//   keys: PropTypes.array,
//   buttonText: PropTypes.string,
//   arrayHelpers: PropTypes.object
// };
