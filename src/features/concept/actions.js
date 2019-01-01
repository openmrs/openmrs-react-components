import CONCEPT_TYPES from "./types";

/**
 * Usage:
 *
 * Calling "fetchConcepts" with an array of 1 or more concept uuids will fetch those concepts and place them in the metadata cache
 *
 * At this point, the concepts should be available via getConcept or getConcepts selector provided by the store
 * Note that the saga that handles fetchConcepts is "smart" enough to not refetch a concept if it is already in the store
 *
 *
 * Sample usage (see ObsValue.jsx for more details):
 *
 * import { selectors } from "../../store";
 * import { conceptActions } from "../../features/concept";
 *
 *  ...
 *
 * // fetch the concept on mount if not available
 * componentDidMount() {
 *   if (!this.props.concept) {
 *     this.props.dispatch(conceptActions.fetchConcepts(['some-concept-we-need-uuid']));
 *   }
 * }
 *
 *  ...
 *
 * // map the concept from state to props
 * const mapStateToProps = (state) => {
 *  return {
 *    concept: selectors.getConcept(state, 'some-concept-we-need-uuid')
 *  };
 * };
 *
 */

// TODO add a "clear cache" actions and reducers

const fetchConcepts = (conceptUuids) => ( {
  type: CONCEPT_TYPES.FETCH_REQUESTED,
  conceptUuids: conceptUuids
} );

const fetchConceptsSucceeded = (concepts) => ( {
  type: CONCEPT_TYPES.FETCH_SUCCEEDED,
  concepts: concepts
} );

const fetchConceptsFailed = (message) => ( {
  type: CONCEPT_TYPES.FETCH_FAILED,
  message: message
} );

export default {
  fetchConcepts,
  fetchConceptsSucceeded,
  fetchConceptsFailed
};
