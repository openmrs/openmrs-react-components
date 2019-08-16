import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider } from "react-intl";

import withLocalization, { initializeLocalization, setDefaultLocale } from '../withLocalization';

let store;
let mountedComponent;

const mockStore = configureMockStore();

const EmptyComponent = () => null;

const LocalizedComponent = withLocalization(EmptyComponent);

const localizedComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <LocalizedComponent/>
      </Provider>
    );
  }
  return mountedComponent;
};

describe("withLocalization", () => {

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it("should wrap null component without error", () => {

    store = mockStore({
      openmrs: {
        session: {

        }
      }
    });

    initializeLocalization();
    localizedComponent();
  });

  it("should default to en messages", () => {

    store = mockStore({
      openmrs: {
        session: {

        }
      }
    });

    initializeLocalization();

    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["reactcomponents.submit"], "Submit");
    expect(localizedComponent().find(IntlProvider).props().locale).toBe('en');
  });

  it("should pick messages based on locale in session", () => {

    store = mockStore({
      openmrs: {
        session: {
          locale: "es"
        }
      }
    });

    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["reactcomponents.submit"],  "Guardar");
    expect(localizedComponent().find(IntlProvider).props().locale).toBe('es');
  });

  it("should properly parse locales with country component", () => {

    store = mockStore({
      openmrs: {
        session: {
          locale: "es_MX"
        }
      }
    });

    initializeLocalization();

    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["reactcomponents.submit"],  "Guardar");
    expect(localizedComponent().find(IntlProvider).props().locale).toBe('es-MX');  // the underlying locale-data tables provided by react-intl use "-" as a delimiter instead of "_"
  });



  it("should add new message codes without overwriting others", () => {

    store = mockStore({
      openmrs: {
        session: {

        }
      }
    });

    initializeLocalization({
      en: {
        "some_test_code": "some_test_value"
      }
    });

    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["some_test_code"], "some_test_value");
    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["reactcomponents.submit"], "Submit");
    expect(localizedComponent().find(IntlProvider).props().locale).toBe('en');
  });

  it("should prefer incoming message code if there is a key collision", () => {

    store = mockStore({
      openmrs: {
        session: {

        }
      }
    });

    initializeLocalization({
      en: {
        "reactcomponents.submit": "new_message"
      }
    });

    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["reactcomponents.submit"], "new_message");
    expect(localizedComponent().find(IntlProvider).props().locale).toBe('en');
  });

  it("should support setting a default locale", () => {

    store = mockStore({
      openmrs: {
        session: {

        }
      }
    });

    initializeLocalization();
    setDefaultLocale('es');

    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["reactcomponents.submit"],  "Guardar");
    expect(localizedComponent().find(IntlProvider).props().locale).toBe('es');
  });


  it("should fall back to default locale if code not in current locale", () => {

    store = mockStore({
      openmrs: {
        session: {
          locale: 'fr'
        }
      }
    });

    initializeLocalization({
      es: {
        "only_in_default_locale": "some_string"
      }
    });
    setDefaultLocale('es');

    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["only_in_default_locale"],  "some_string");
    expect(localizedComponent().find(IntlProvider).props().locale).toBe('fr');
  });

  it("should support default locale with country code", () => {

    store = mockStore({
      openmrs: {
        session: {
          locale: 'fr'
        }
      }
    });

    initializeLocalization({
      es: {
        "only_in_default_locale": "some_string"
      }
    });
    setDefaultLocale('es_MX');

    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["only_in_default_locale"],  "some_string");
    expect(localizedComponent().find(IntlProvider).props().locale).toBe('fr');
  });




  it("should correctly localize to Kreyol", () => {

    store = mockStore({
      openmrs: {
        session: {
          locale: 'ht'
        }
      }
    });

    setDefaultLocale('ht');

    expect(localizedComponent().find(IntlProvider).props().messages).toHaveProperty(["reactcomponents.submit"],  "Soumèt");
    expect(localizedComponent().find(IntlProvider).props().locale).toBe('ht');
  });

});
