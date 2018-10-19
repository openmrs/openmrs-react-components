import React from 'react';
import renderer from 'react-test-renderer';
import FieldInput from '../FieldInput';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    props= {
      input: {},
      placeholder: 'mockplaceholder',
      type: 'mockType',
      meta: { touched: true, error: false, warning: false }
    };
    mountedComponent = renderer.create(<FieldInput {...props} />);
  }
  return mountedComponent;
};

describe('Component: FieldInput', () => {
  beforeEach(() => {
    props = {
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component.toJSON()).toMatchSnapshot();
  });
});
