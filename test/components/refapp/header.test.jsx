
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../../src/components/refapp/Header';

describe("header", () => {

  var mockStore = configureMockStore([thunk]);

  it ("should render correctly", () => {
    const store = mockStore({});

    const rendered = renderer.create(
      <Provider store={store}>
        <Header/>
      </Provider>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  })

})
