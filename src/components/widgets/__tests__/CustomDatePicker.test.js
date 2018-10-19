import React from 'react';
import renderer from 'react-test-renderer';
import CustomDatePicker from '../CustomDatePicker';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = renderer.create(<CustomDatePicker {...props} />);
  }
  return mountedComponent;
};

describe('Component: CustomDatePicker', () => {
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
