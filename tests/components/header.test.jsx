
import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../lib/components/Header';

describe("header", () => {
  
  it ("should render correctly", () => {
    const rendered = renderer.create(
      <Header />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  })

})
