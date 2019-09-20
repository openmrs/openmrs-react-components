
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from "react-intl";
import LocalizationContext from './LocalizationContext';

const LocalizedMessage = (props) => {
  return (

    <LocalizationContext.Consumer>
      {context =>
        context && context.hasOwnProperty('intlProviderAvailable') && context.intlProviderAvailable ?
          (
            <FormattedMessage
              defaultMessage={props.defaultMessage}
              id={props.id}
            />
          ) : (
            <span>
              {props.defaultMessage}
            </span>
          )
      }
    </LocalizationContext.Consumer>
  );
};


LocalizedMessage.propTypes = {
  defaultMessage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default LocalizedMessage;
