import React from 'react';
import renderer from 'react-test-renderer';
import Dropdown from '../Dropdown';
import { IntlProvider } from 'react-intl';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = renderer.create(<IntlProvider locale="en"><Dropdown {...props} /></IntlProvider>);
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
