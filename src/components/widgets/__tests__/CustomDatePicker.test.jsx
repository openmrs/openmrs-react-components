import React from 'react';
import moment from 'moment';
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
      defaultDate: moment('2018-10-23T00:00:00.000'),
      excludeDates: []
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component.toJSON()).toMatchSnapshot();
  });
});
