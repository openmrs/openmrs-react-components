import React from 'react';
import renderer from 'react-test-renderer';
import ToolTip from '../ToolTip';


const props = {
  tests: [ 'sampleA', 'sampleB', 'sampleC' ],
  header: "mockToolTipHeader"
};
describe('Component: TestsToolTip', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(
      <ToolTip
        toolTipBody={props.tests}
        toolTipHeader={props.header}
      />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render without toolTipHeader', () => {
    const wrapper = renderer.create(
      <ToolTip
        toolTipBody={props.tests}
      />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render without toolTipBody', () => {
    const wrapper = renderer.create(
      <ToolTip
        toolTipHeader={props.header}
      />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
