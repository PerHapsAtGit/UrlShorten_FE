import appReducer, { initialState } from './index';
import { ACTION_TYPES } from '../constants';

describe('appReducer', () => {
  it('should return initial state if undefined', () => {
    const expected = initialState;
    const result = appReducer(undefined, {
      type: 'unknown',
    });

    expect(result).to.equal(expected);
  });

  it('should return IN_PROGRESS', () => {
    const expected = {
      type: ACTION_TYPES.SHORTEN_URL_IN_PROGRESS,
    };
    const result = appReducer(undefined, expected);

    expect(result.serviceInUse).to.be.true;
  });

  it('should return SUCCESS', () => {
    const expected = {
      type: ACTION_TYPES.SHORTEN_URL_SUCCESS,
      data: { hash: '123' },
    };
    const result = appReducer(undefined, expected);

    expect(result.serviceInUse).to.be.false;
    expect(result.serviceErrorMsg).to.be.null;
    expect(result.hash).to.equal('123');
  });

  it('should return ERROR', () => {
    const expected = {
      type: ACTION_TYPES.SHORTEN_URL_ERROR,
      data: {
        errorMsg: 'ERROR',
      },
    };
    const result = appReducer(undefined, expected);

    expect(result.serviceInUse).to.be.false;
    expect(result.serviceErrorMsg).to.equal('ERROR');
  });
});
