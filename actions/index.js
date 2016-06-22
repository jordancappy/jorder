export const FORM_REQUEST = 'FORM_REQUEST'
export const FORM_SUCCESS = 'FORM_SUCCESS'
export const FORM_FAILURE = 'FORM_FAILURE'
export const ADD_PAGE = 'ADD_PAGE'

import * as types from './types'
import { normalize } from 'normalizr'
import { Schema, arrayOf } from 'normalizr'

const formSchema = new Schema('forms', { idAttribute: '_id' })
const pageSchema = new Schema('pages', { idAttribute: '_id' })
const questionSchema = new Schema('questions', { idAttribute: '_id' })

formSchema.define({
  pages: arrayOf(pageSchema)
})

pageSchema.define({
  questions: arrayOf(questionSchema)
})

/* load form section */
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
    formId: json.result,
    entities: json.entities,
    receivedAt: Date.now()
  }
}

export function fetchForm(formId) {
  return dispatch => {
    dispatch(requestForm(formId))
    return $.get(`/api/forms/${formId}`)
      .then(json => {
        let response = normalize(json, formSchema)
        dispatch(receiveForm(formId,response))
      })
  }
}

/* add page section */
let nextPageId = 0
let nextQuestionId = 0
export function addPage(formId) {
  let pageId = `new_${nextPageId++}`
  let questionId = `new_${nextQuestionId++}`

  return dispatch => {
    dispatch({
      type: 'CREATE_QUESTION',
      id: questionId,
      question: {
        id: questionId,
        name: '',
        type: '',
        answers: []
      }
    })

    dispatch({
      type: ADD_PAGE,
      pageId: pageId,
      formId,
      page: {
        name: '',
        questions: [questionId]
      }
    })
  }
}

export const createQuestion = (pageId) => {
  let questionId = `new_${nextQuestionId++}`
  return {
    type: 'CREATE_QUESTION',
      id: questionId,
      pageId,
      question: {
        id: questionId,
        name: '',
        type: '',
        answers: []
      }
  }
}

export const updatePage = (pageId, page) => {
  return {
    type: 'UPDATE_PAGE',
    id: pageId,
    page
  }
}

export const updateQuestion = (id, question) => {
  return {
    type: 'UPDATE_QUESTION',
    id,
    question
  }
}


/* move question section */
export const moveQuestion = (dragIndex, hoverIndex, pageId) => {
  return {
    type: types.MOVE_QUESTION,
    dragIndex,
    hoverIndex,
    pageId
  }
}
