import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const Head = ({ intl, id, defaultTitle }) => {  
  const translatedTitle = intl.formatMessage({ id });
  return (
    <span>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {translatedTitle || defaultTitle}
        </title>
      </Helmet>
    </span>
  );
};

Head.propTypes = {
  defaultTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  intl: PropTypes.object,
};


export default injectIntl(Head);


