import React from 'react';
import renderer from 'react-test-renderer';
import ButtonGroup from '../ButtonGroup';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = renderer.create(<ButtonGroup {...props} />);
  }
  return mountedComponent;
};

describe('Component: ButtonGroup', () => {
  beforeEach(() => {
    props = {
      input: {
        name: 'mockname'
      },
      options: [{
        name: 'mockName',
        uuid: '1234'
      }]
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component.toJSON()).toMatchSnapshot();
  });
});
