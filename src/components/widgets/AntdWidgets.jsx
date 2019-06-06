import React from "react";
import { Form, Input, Radio, Select, Checkbox, DatePicker, Switch, Slider, InputNumber } from "antd";

const FormItem = Form.Item;

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      label={label}
      validateStatus={hasError ? "error" : "success"}
    >
      <Component 
        {...input}
        {...rest}
        children={children}
      />
    </FormItem>
  );
};


const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;


export const AInput = makeField(Input);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeField(Select);
export const AOption = Option;
export const ACheckbox = makeField(Checkbox);
export const ATextarea = makeField(TextArea);
export const ARangePicker = makeField(RangePicker);
export const ASwitch = makeField(Switch);
export const ASlider = makeField(Slider);
export const AInputNumber = makeField(InputNumber);
