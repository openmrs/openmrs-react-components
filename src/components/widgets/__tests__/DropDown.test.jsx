import React from 'react';
import renderer from 'react-test-renderer';
import Dropdown from '../Dropdown';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = renderer.create(<Dropdown {...props} />);
  }
  return mountedComponent;
};

describe('Component: Dropdown', () => {
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
