import headerActions from '../actions';
import HEADER_TYPES from '../types';

describe('header actions', () => {

  it('should create get login location links action', () => {
    const expectedAction = {
      type: HEADER_TYPES.LOGO_LINKS.REQUESTED,
    };
    expect(headerActions.getHeaderLogoLinks()).toEqual(expectedAction);
  });

  it('should create get login location links succeeded action', () => {
    const expectedAction = {
      type: HEADER_TYPES.LOGO_LINKS.SUCCEEDED,
      payload: { 
        logoLinkUrl: 'sampleLogoLinkUrl',
        logoIconUrl: 'sampleLogoIconUrl'
      }
    };
    expect(headerActions.getHeaderLogoLinksSucceeded({ 
      logoLinkUrl: 'sampleLogoLinkUrl',
      logoIconUrl: 'sampleLogoIconUrl'
    })).toEqual(expectedAction);
  });

  it('should create login location links failed', () => {
    const expectedAction = {
      type: HEADER_TYPES.LOGO_LINKS.FAILED,
      error: {
        message: "someerror"
      }
    };
    expect(headerActions.getHeaderLogoLinksFailed("someerror")).toEqual(expectedAction);
  });

});
