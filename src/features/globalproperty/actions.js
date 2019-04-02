import GLOBAL_PROPERTY_TYPES from "./types.js";

/**
 * Usage:
 *
 * "fetchGlobalProperty" is called with a global property name; it will fetch that global property and
 * place the name/value pair in the global property metadata cache
 *
 * At this point, the global property should be available via getGlobalProperty or getGlobalProperties selectors provided by the store
 * Note that the saga that handles fetchGlobalProperty is "smart" enough to not refetch a GP if it is already in the store
 *
 * Sample usage:
 *
 * import { selectors } from "../../store";
 * import { globalPropertyActions } from "../../features/globalProperty";
 *
 *  ...
 *
 * // fetch the GP on mount if not available
 * componentDidMount() {
 *   if (!this.props.someGlobalProperty) {
 *     this.props.dispatch(globalPropertyActions.fetchGlobalProperty('some-global-property-name'));
 *   }
 * }
 *
 *  ...
 *
 * // map the concept from state to props
 * const mapStateToProps = (state) => {
 *  return {
 *    someGlobalProperty: selectors.getGlobalProperty(state, 'some-global-property-name')
 *  };
 * };
 *
 */

// TODO add action to clear cache

const fetchGlobalProperty = (globalProperty) => ({
  type: GLOBAL_PROPERTY_TYPES.FETCH_REQUESTED,
  globalProperty: globalProperty
});

const fetchGlobalPropertySucceeded = (globalProperty) => ({
  type: GLOBAL_PROPERTY_TYPES.FETCH_SUCCEEDED,
  globalProperty: globalProperty
});

const fetchGlobalPropertyFailed = (message) => ({
  type: GLOBAL_PROPERTY_TYPES.FETCH_FAILED,
  message: message
});

const clearGlobalPropertiesCache = () => ({
  type: GLOBAL_PROPERTY_TYPES.CLEAR_CACHE
});

export default {
  fetchGlobalProperty,
  fetchGlobalPropertySucceeded,
  fetchGlobalPropertyFailed,
  clearGlobalPropertiesCache
};
