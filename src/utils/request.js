function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 500) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function makeReqOptions(params = {}) {
  const options = {
    method: 'GET',
    headers: {
      Accept: '*/*',
    },
  };

  if (params.contentType) {
    options.headers['Content-Type'] = params.contentType;
  } else {
    options.headers['Content-Type'] = 'application/json';
  }

  if (params.apiKey) {
    options.headers['X-Api-Key'] = params.apiKey;
  }

  if (params.method) {
    options.method = params.method;
  }

  if ((params.method === 'POST' || params.method === 'PUT' || params.method === 'PATCH') && params.data) {
    if (options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      const searchParams = Object.keys(params.data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params.data[key])}`)
        .join('&');
      options.body = searchParams;
    } else if (options.headers['Content-Type'] === 'application/json') {
      options.body = JSON.stringify(params.data);
    } else {
      // this is to handle multipart-formdata and other such content types
      options.body = params.data;
      // options.mode = 'no-cors';
    }
  } else if (params.data) {
    options.queryParams = params.data;
  }
  if (params.payload) {
    options.queryParams = params.payload;
  }
  return options;
}


export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
