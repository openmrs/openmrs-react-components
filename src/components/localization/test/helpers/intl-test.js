/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export const shallowWithIntl = node => shallow(nodeWithIntlProp(node), { context: { intl } });

export const mountWithIntl = node => mount(nodeWithIntlProp(node), {
  context: { intl },
  childContextTypes: { intl: intlShape },
});
