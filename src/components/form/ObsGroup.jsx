import React from 'react';
import PropTypes from 'prop-types'
import ObsGroupContext from './ObsGroupContext';
import withObsGroupContext from './withObsGroupContext';

const ObsGroup = (props) => {

  const existingGroupingConcepts = props.obsGroupContext ? props.obsGroupContext.groupingConcepts : [];

  const context = {
    path: (props.obsGroupContext ? props.obsGroupContext.path + '^' : '') + props.path,
    groupingConcepts:[...existingGroupingConcepts, props.groupingConcept]
  };

  return (
    <ObsGroupContext.Provider value={context}>
      {props.children}
    </ObsGroupContext.Provider>
  );

};

ObsGroup.propTypes = {
  groupingConcept: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]).isRequired,
  path: PropTypes.string.isRequired,
};

export default withObsGroupContext(ObsGroup);
