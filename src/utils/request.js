import fetch from 'dva/fetch';

function parseJSON(response) {
  if (response.status !== 204) {
    return response.json();
  }
  return {};
}

function checkStatus(json) {
  if (json.message || json.status_code) {
    const error = new Error(json.message);
    error.response = json;
    throw error;
  }
  return json;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const fetchOption = {
    ...options,
    credentials: 'same-origin',
    headers: {
      ...defaultHeaders,
      ...(options && options.headers),
    },
  };

  const response = await fetch(url, fetchOption);
  const data = await parseJSON(response);
  checkStatus(data);
  return { data };
}
