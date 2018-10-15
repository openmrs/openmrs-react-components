import React from 'react';
import ObsGroupContext from './ObsGroupContext';

function withObsGroupContext(WrappedComponent)  {

  class WithObsGroupContext extends React.PureComponent {
    render() {
      return (
        <ObsGroupContext>
          {obsGroupContext => <WrappedComponent {...this.props} obsGroupContext={obsGroupContext} />}
        </ObsGroupContext>
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
