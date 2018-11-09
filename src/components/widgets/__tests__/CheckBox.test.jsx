import React from 'react';
import renderer from 'react-test-renderer';
import CheckBox from '../CheckBox';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = renderer.create(<CheckBox {...props} />);
  }
  return mountedComponent;
};

describe('Component: CheckBox', () => {
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
