import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { ACTION_TYPES, SAGA_ERROR_MSG } from '../constants';
import { postShortenUrl } from '../api';

export function* shortenUrlSaga(action) {
  yield put({ type: ACTION_TYPES.SHORTEN_URL_IN_PROGRESS });

  try {
    const result = yield call(postShortenUrl, action.url);
    if (result.success) {
      yield put({
        type: ACTION_TYPES.SHORTEN_URL_SUCCESS,
        data: result.data,
      });
    } else {
      yield put({
        type: ACTION_TYPES.SHORTEN_URL_ERROR,
        data: result.data,
      });
    }
  } catch (error) {
    yield put({
      type: ACTION_TYPES.SHORTEN_URL_ERROR,
      data: {
        errorMsg: SAGA_ERROR_MSG,
      },
    });
  }
}

export default function* () {
  yield takeLatest(ACTION_TYPES.SHORTEN_URL, shortenUrlSaga);
}
