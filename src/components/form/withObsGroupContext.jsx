import React from 'react';
import ObsGroupContext from './ObsGroupContext';

function withObsGroupContext(WrappedComponent)  {

  class WithObsGroupContext extends React.PureComponent {
    render() {
      return (
        <ObsGroupContext.Consumer>
          {obsGroupContext => <WrappedComponent {...this.props} obsGroupContext={obsGroupContext} />}
        </ObsGroupContext.Consumer>
      );
    }
  }

  WithObsGroupContext.displayName = `WithObsGroupContext(${getDisplayName(WrappedComponent)})`;

  return WithObsGroupContext;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withObsGroupContext;
