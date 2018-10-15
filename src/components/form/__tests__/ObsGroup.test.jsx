import React from 'react';
import { shallow } from 'enzyme';
import ObsGroup from '../ObsGroup';

let mountedComponent;


const obsGroup = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(
      <ObsGroup/>
    );
  }
  return mountedComponent;
};

describe("ObsGroup", () => {

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it("should render correctly", () => {
    obsGroup();
  });

});
