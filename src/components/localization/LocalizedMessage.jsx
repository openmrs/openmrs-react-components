
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from "react-intl";
import LocalizationContext from './LocalizationContext';

const LocalizedMessage = (props) => {
  return (

    <LocalizationContext.Consumer>
      {context =>
        context.intlProviderAvailable ?
          (
            <FormattedMessage
              defaultMessage={props.defaultMessage}
              id={props.id}
            >
              {props.children}
            </FormattedMessage>
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
