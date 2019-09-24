import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import LocalizedMessage from '../localization/LocalizedMessage';

const Head = ({ id, defaultTitle }) => {
  return (
    <span>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`
          <LocalizedMessage
            defaultMessage={defaultTitle}
            id={id}
          />
          `}
        </title>
      </Helmet>
    </span>
  );
};

Head.propTypes = {
  defaultTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};


export default Head;


