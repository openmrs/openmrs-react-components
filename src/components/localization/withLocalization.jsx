/* eslint-disable */
/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from "react-intl";
import { merge } from 'lodash';

// we should feel free to add new locales here as needed, but is there a better way to do this dynamically?
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';

import LocalizationContext from './LocalizationContext'

// "homemade" locale file since locale for Haiti is not currently supported
import ht from '../../localization/locale-data/ht'

import messagesEN from "../../localization/translations/en.json";
import messagesFR from "../../localization/translations/fr.json";
import messagesES from "../../localization/translations/es.json";
import messagesHT from "../../localization/translations/ht.json";
import {sessionActions} from "../../features/session";

let defaultLocale = 'en';
let localeMessages = {};

export const addLocaleMessages = (messages) => {
  localeMessages = merge({}, localeMessages, messages);
  return localeMessages;
};

export const setDefaultLocale = (locale) => {
  defaultLocale = locale;
};

// TODO add support to initialize only a subset of locales?
export const initializeLocalization = (messages) => {

  defaultLocale = 'en';

  localeMessages = {
    en: messagesEN,
    fr: messagesFR,
    es: messagesES,
    ht: messagesHT
  };

  addLocaleData([...en, ...fr, ...es, ...ht]);

  if (messages) {
    addLocaleMessages(messages)
  }

  // If browser doesn't support Intl (i.e. Safari), then we manually import
  // the intl polyfill and locale data.
  if (!window.intl) {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/fr.js');
    require('intl/locale-data/jsonp/es.js');
    // TODO: do we need to import HT here somehow?
  }

};

const withLocalization = (WrappedComponent) => {
  class Localization extends React.PureComponent {

    componentDidMount() {
      this.props.dispatch(sessionActions.fetchSession());
    }

    render() {

      const locale = this.props.locale ? this.props.locale : defaultLocale;

      const localeWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0];
      const defaultLocaleWithoutRegionCode = defaultLocale.toLowerCase().split(/[_-]+/)[0];
      const messages = merge({}, localeMessages[defaultLocaleWithoutRegionCode], localeMessages[localeWithoutRegionCode]);

      // the underlying locale-data tables provided by react-intl use "-" as a delimiter instead of "_"
      // the LocalizationContext is currently *only* used to alert consumers if IntlProvider is available
      // (this allows components with LocalizedMessage to be used even if the parent app hasn't be decorated
      // with "withLocalization")
      return (
        <LocalizationContext.Provider value={ {intlProviderAvailable: true} }>
          <IntlProvider
            key={ locale }
            locale={ locale.replace("_","-") }
            messages={messages}
          >
            <WrappedComponent {...this.props} />
          </IntlProvider>
        </LocalizationContext.Provider>
      );
    }
  }

  Localization.propTypes = {
    locale: PropTypes.string,
  };

  return Localization;
};

const mapStateToProps = (state) => {
  const { locale } = state.openmrs.session;
  return {
    locale,
  };
};

const composedHoc = compose(
  connect(mapStateToProps),
  withLocalization
);

export default composedHoc;
