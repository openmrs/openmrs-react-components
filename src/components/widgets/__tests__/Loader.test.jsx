import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../Loader';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = renderer.create(<Loader {...props} />);
  }
  return mountedComponent;
};

describe('Component: Loader', () => {
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
