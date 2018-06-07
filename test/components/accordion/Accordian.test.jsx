import React from 'react';
import renderer from 'react-test-renderer';
import Accordion from '../../../src/components/accordion/Accordian';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = renderer.create(<Accordion {...props} />);
  }
  return mountedComponent;
};

describe('Component: Accordion', () => {
  beforeEach(() => {
    props = {
      open: true,
      title: 'Header',
      children: <h1>I love this</h1>
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('calls the onclick', () => {
    const renderedComponent = getComponent().root;
    renderedComponent.findByProps({ className: "header" }).props.onClick();
    expect(renderedComponent.instance.state.isVisible).toEqual(false);
  });
});
