import CONCEPT_TYPES from "./types";

/**
 * Usage:
 *
 * "fetchConcepts" can be called with an array of 1 or more concepts OR conceptUuids; it will fetch those concepts and
 * place them in the concept metadata cache
 *
 * At this point, the concepts should be available via getConcept or getConcepts selector provided by the store
 * Note that the saga that handles fetchConcepts is "smart" enough to not refetch a concept if it is already in the store
 *
 * Note that if you pass in an array of concepts and there are other properties on those concepts beyond uuids,
 * those properties will take precedent over existing properties on the concepts... this way your app can provide
 * custom names, hi/low validation amounts, etc, to the concepts
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
 *   if (!this.props.someConcept) {
 *     this.props.dispatch(conceptActions.fetchConcepts(['some-concept-we-need-uuid']));
 *   }
 * }
 *
 *  ...
 *
 * // map the concept from state to props
 * const mapStateToProps = (state) => {
 *  return {
 *    someConcept: selectors.getConcept(state, 'some-concept-we-need-uuid')
 *  };
 * };
 *
 */

// TODO add a "clear cache" actions and reducers

const fetchConcepts = (concepts) => ( {
  type: CONCEPT_TYPES.FETCH_REQUESTED,
  concepts: concepts
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
