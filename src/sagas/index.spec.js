import { call, put } from 'redux-saga/effects';
import { shortenUrlSaga } from './index';
import { ACTION_TYPES, SAGA_ERROR_MSG } from '../constants';
import { postShortenUrl } from '../api';

const url = '123';
const hash = 'abc';
const errorMsg = 'ERROR';

describe('fetchRecordsSaga', () => {
  it('should emit successful api call', () => {
    const action = {
      type: ACTION_TYPES.SHORTEN_URL,
      url,
    };

    const generator = shortenUrlSaga(action);
    const yield1 = put({
      type: ACTION_TYPES.SHORTEN_URL_IN_PROGRESS,
    });
    expect(generator.next().value).to.deep.equal(yield1);

    const mockData = {
      hash,
    };

    const yield2 = call(postShortenUrl, action.url);
    expect(generator.next().value).to.deep.equal(yield2);

    const expected = put({
      type: ACTION_TYPES.SHORTEN_URL_SUCCESS,
      data: mockData,
    });

    const successfulApiResult = {
      success: true,
      data: mockData,
    };
    expect(generator.next(successfulApiResult).value).to.deep.equal(expected);
  });

  it('should emit failed api call', () => {
    const action = {
      type: ACTION_TYPES.SHORTEN_URL,
      url,
    };

    const generator = shortenUrlSaga(action);
    const yield1 = put({
      type: ACTION_TYPES.SHORTEN_URL_IN_PROGRESS,
    });
    expect(generator.next().value).to.deep.equal(yield1);

    const yield2 = call(postShortenUrl, action.url);
    expect(generator.next().value).to.deep.equal(yield2);

    const expected = put({
      type: ACTION_TYPES.SHORTEN_URL_ERROR,
      data: {
        errorMsg,
      },
    });

    const failedApiResult = {
      success: false,
      data: {
        errorMsg,
      },
    };
    expect(generator.next(failedApiResult).value).to.deep.equal(expected);
  });

  it('should handle exception', () => {
    const action = {
      type: ACTION_TYPES.SHORTEN_URL,
      url,
    };

    const generator = shortenUrlSaga(action);
    const yield1 = put({
      type: ACTION_TYPES.SHORTEN_URL_IN_PROGRESS,
    });
    expect(generator.next().value).to.deep.equal(yield1);

    const yield2 = call(postShortenUrl, action.url);
    expect(generator.next().value).to.deep.equal(yield2);

    const expected = put({
      type: ACTION_TYPES.SHORTEN_URL_ERROR,
      data: {
        errorMsg: SAGA_ERROR_MSG,
      },
    });

    expect(generator.throw({id: '123'}).value).to.deep.equal(expected);
  });
});
