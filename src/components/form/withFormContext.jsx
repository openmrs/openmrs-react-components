import React from 'react';
import FormContext from './FormContext';

function withFormContext(WrappedComponent)  {

  class WithFormContext extends React.PureComponent {
    render() {
      return (
        <FormContext.Consumer>
          {formContext => <WrappedComponent {...this.props} formContext={formContext} />}
        </FormContext.Consumer>
      );
    }
  }

  WithFormContext.displayName = `WithFormContext(${getDisplayName(WrappedComponent)})`;

  return WithFormContext;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withFormContext;
