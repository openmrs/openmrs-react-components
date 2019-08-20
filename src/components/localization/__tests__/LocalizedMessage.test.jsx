import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { FormattedMessage } from "react-intl";

import withLocalization, { initializeLocalization } from '../withLocalization';
import LocalizedMessage from '../LocalizedMessage';


let store;
let mountedComponent;

let defaultMessage = "";
let id = "";

const mockStore = configureMockStore();


const localizedMessage = () => {

  const LocalizedComponent = withLocalization(LocalizedMessage);

  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <LocalizedComponent
          defaultMessage={defaultMessage}
          id={id}
        />
      </Provider>
    );
  }
  return mountedComponent;
};

describe("LocalizedMessage", () => {

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it("should render FormattedMessage with id and default message", () => {

    store = mockStore({
      openmrs: {
        session: {

        }
      }
    });

    defaultMessage = "Some default message";
    id = "some_id";

    initializeLocalization();

    expect(localizedMessage().find(FormattedMessage).props().defaultMessage).toBe("Some default message");
    expect(localizedMessage().find(FormattedMessage).props().id).toBe("some_id");
  });

  it("should just render default message if no IntlProvider", () => {
    expect(mount(
      <LocalizedMessage
        defaultMessage="Some default message"
        id="some_id"
      />)
      .find('span').text()).toBe("Some default message");
  });



});
