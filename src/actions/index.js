import { ACTION_TYPES } from '../constants';

/**
 * Redux action for shorten url
 * 
 * @param {string} url 
 * 
 * @return {object}
 */
export function shortenUrl(url) {
  return {
    type: ACTION_TYPES.SHORTEN_URL,
    url,
  };
}