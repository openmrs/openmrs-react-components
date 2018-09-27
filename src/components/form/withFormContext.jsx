import React from 'react';
import FormContext from './FormContext';

function withFormContext(Component)  {
  return (props) => {
    return (
      <FormContext.Consumer>
        {context => <Component {...props} context={context} />}
      </FormContext.Consumer>
    );
  };
}

export default withFormContext;
