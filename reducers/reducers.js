import { combineReducers } from 'redux'
import * as types from '../actions/types'
import { routerReducer } from 'react-router-redux'

const initialState = {
  forms: [],
  pages: [],
  questions: [],
  selectedForm: '',
  isFetching: true
}

// returns the form id of currently viewed form
function selectedForm(state = '', action) {
  switch (action.type) {
    case types.FORM_REQUEST:
      return action.formId
    default: 
      return state
  }
}

// returns forms list with list of pages and questions
function forms(state = initialState.forms, action) {
  switch (action.type) {
    case types.FORM_REQUEST:
      return Object.assign({}, state, {
        [action.formId]: {
          isFetching: true,
          pages: []
        },
      })
    case types.FORM_SUCCESS: 
      return Object.assign({}, state, {
        [action.formId]: {
          name: action.name,
          isFetching: false,
          lastUpdates: action.receivedAt,
          pages: pages(state[action.formId].pages,action)
        },
      })
    case types.ADD_PAGE:
      return Object.assign({}, state, {
        [action.formId]: {
          pages: pages(state[action.formId].pages,action)
        },
      })
    default:
      return state;
  }
}

function pages(state = [], action){
  switch (action.type) {
    case types.FORM_SUCCESS:
      return action.pages
    case types.ADD_PAGE:
      return [
        ...state,
        {
          _id: action.pageId,
          name: '',
          formId: action.formId
        }
      ]
    default:
      return state
  }
}


const rootReducer = combineReducers({
  selectedForm,
  forms,
  routing: routerReducer
})

export default rootReducer