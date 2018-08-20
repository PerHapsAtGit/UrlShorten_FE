import appReducer, { initialState } from './index';
import { ACTION_TYPES } from '../constants';

describe('appReducer', () => {
  it('should return initial state if undefined', () => {
    const expected = initialState;
    const result = appReducer(undefined, {
      type: 'unknown',
    });

    expect(result).toEqual(expected);
  });

  it('should return IN_PROGRESS', () => {
    const expected = {
      type: ACTION_TYPES.SHORTEN_URL_IN_PROGRESS,
    };
    const result = appReducer(undefined, expected);

    expect(result.serviceInUse).toBeTrue;
  });

  it('should return SUCCESS', () => {
    const expected = {
      type: ACTION_TYPES.SHORTEN_URL_SUCCESS,
      data: { hash: '123' },
    };
    const result = appReducer(undefined, expected);

    expect(result.serviceInUse).toBeFalse;
    expect(result.serviceErrorMsg).toBeNull;
    expect(result.hash).toEqual('123');
  });

  it('should return ERROR', () => {
    const expected = {
      type: ACTION_TYPES.SHORTEN_URL_ERROR,
      data: {
        errorMsg: 'ERROR',
      },
    };
    const result = appReducer(undefined, expected);

    expect(result.serviceInUse).toBeFalse;
    expect(result.serviceErrorMsg).toEqual('ERROR');
  });
});
