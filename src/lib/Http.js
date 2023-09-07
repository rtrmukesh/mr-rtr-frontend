export function getResponseMessage(response) {
  if (response && response.data) {
    return response.data.message;
  }
}

//bad request function

export function isBadRequest(error) {
  return error.response && error.response.status >= 400;
}

// error message  funcion

export function getErrorMessage(error) {
  const errorRequest = error.response.request;
  if (errorRequest && errorRequest.response) {
    return JSON.parse(errorRequest.response).message;
  }
}

export const SUCCESS_RESPONSE = 200;