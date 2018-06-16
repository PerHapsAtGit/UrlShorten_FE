import { SERVICE_URL } from '../constants';
/**
 * Call url shorten api
 * @param{string} url
 * @return {Promise}
 */
export function postShortenUrl(url) {
  return fetch(SERVICE_URL, {
    method: 'POST',
    body: JSON.stringify({
      url,
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return {
        success: !data.errorMsg,
        data,
      };
    })
    .catch(() => {
      return {
        success: false,
        data: {
          errorMsg: 'API Service Error',
        },
      };
    });
}