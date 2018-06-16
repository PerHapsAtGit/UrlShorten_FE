import { ACTION_TYPES } from '../constants';

export const initialState = {
  serviceInUse: false,
};

/**
 * Reducer for <App />
 *
 * @param {object} state - app state
 * @param {object} action - redux action
 *
 * @return {object}
 */
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SHORTEN_URL_IN_PROGRESS: {
      return {
        ...state,
        serviceInUse: true,
      };
    }

    case ACTION_TYPES.SHORTEN_URL_SUCCESS: {
      return {
        ...state,
        hash: action.data.hash,
        serviceInUse: false,
        serviceErrorMsg: null,
      };
    }

    case ACTION_TYPES.SHORTEN_URL_ERROR: {
      return {
        ...state,
        serviceInUse: false,
        serviceErrorMsg: action.data.errorMsg,
      };
    }

    default: {
      return state;
    }
  }
}
