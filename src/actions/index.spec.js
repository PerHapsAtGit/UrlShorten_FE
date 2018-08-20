import { ACTION_TYPES } from '../constants';
import * as actions from './index';

describe('Redux action functions', () => {
  it('should create an action for shorten url', () => {
    const url = 'random';
    const expected = {
      type: ACTION_TYPES.SHORTEN_URL,
      url,
    };
    const result = actions.shortenUrl(url);

    expect(result).toEqual(expected);
  });
});