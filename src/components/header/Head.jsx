import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import LocalizedMessage from '../localization/LocalizedMessage';

const Head = ({ id, defaultTitle }) => {
  return (
    <span>
      <Helmet>
        <meta charSet="utf-8" />
        <LocalizedMessage
          defaultMessage={defaultTitle}
          id={id}
        >
          { text => <title>{text}</title>}
        </LocalizedMessage>
      </Helmet>
    </span>
  );
};

Head.propTypes = {
  defaultTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};


export default Head;


