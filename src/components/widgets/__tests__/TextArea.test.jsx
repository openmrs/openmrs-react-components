import React from 'react';
import renderer from 'react-test-renderer';
import TextArea from '../TextArea';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = renderer.create(<TextArea {...props} />);
  }
  return mountedComponent;
};

describe('Component: TextArea', () => {
  beforeEach(() => {
    props = {
      input: {
        name: 'mockname'
      },
      placeholder: 'mockplaceholder',
      value: 'mockvalue',
      displayValue: 'displayValue',
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component.toJSON()).toMatchSnapshot();
  });
});
