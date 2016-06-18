export const FORM_REQUEST = 'FORM_REQUEST'
export const FORM_SUCCESS = 'FORM_SUCCESS'
export const FORM_FAILURE = 'FORM_FAILURE'
export const ADD_PAGE = 'ADD_PAGE'

// fetches a form via the api /api/form
export function loadForm(id) {
  return {
    type: FORM_REQUEST,
    formId
  }
}

function requestForm(formId) {
  return {
    type: FORM_REQUEST,
    formId
  }
}

function receiveForm(formId, json) {
  return {
    type: FORM_SUCCESS,
    formId,
    name: json.name,
    pages: json.pages,
    receivedAt: Date.now()
  }
}

export function fetchForm(formId) {
  return dispatch => {
    dispatch(requestForm(formId))
    return $.get(`/api/forms/${formId}`)
      .then(json => dispatch(receiveForm(formId,json)))
  }
}

let nextPageId = 0
export const addPage = (formId) => {
  return {
    type: ADD_PAGE,
    pageId: nextPageId++,
    formId
  }
}
