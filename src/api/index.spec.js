import { postShortenUrl } from './index';
import { SERVICE_URL } from '../constants';

describe('postShortenUrl() api call for data fetch', () => {
  it('should return correct data', (done) => {
    const serviceResult = {
      hash: '123',
    };
    const mockResult = {
      success: true,
      data: serviceResult,
    };
    fetchMock.mock(SERVICE_URL, serviceResult);

    postShortenUrl('anything').then((resultData) => {
      expect(resultData).to.deep.equal(mockResult);
      done();
    })
      .catch(done);

    fetchMock.restore();
  });

  it('should return error message', (done) => {
    const serviceResult = {
      errorMsg: 'wrong',
    };
    const mockResult = {
      success: false,
      data: serviceResult,
    };
    fetchMock.mock(SERVICE_URL, serviceResult);

    postShortenUrl('anything').then((resultData) => {
      expect(resultData).to.deep.equal(mockResult);
      done();
    })
      .catch(done);

    fetchMock.restore();
  });

  it('should catch service faliure error', (done) => {
    const serviceResult = {
      errorMsg: 'API Service Error',
    };
    const mockResult = {
      success: false,
      data: serviceResult,
    };
    fetchMock.mock(SERVICE_URL, 500);

    postShortenUrl('anything').then((resultData) => {
      expect(resultData).to.deep.equal(mockResult);
      done();
    })
      .catch(done);

    fetchMock.restore();
  });
});