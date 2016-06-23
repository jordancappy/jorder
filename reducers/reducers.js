import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import union from 'lodash/union'
import * as types from '../actions/types'
import { routerReducer } from 'react-router-redux'

const initialState = {
  forms: [],
  pages: [],
  questions: []
}

function selectedForm(state = '', action) {
  switch (action.type) {
    case types.FORM_REQUEST:
      return action.formId
    default: 
      return state
  }
}

function updateForm(state = {
  name: '',
  pages: []
}, action) {
  switch (action.type) {
    case types.ADD_PAGE:
      state.pages.push(action.pageId)
      return state
    default: 
      return state
  }
}

const forms = (state ={}, action)=> {
  switch (action.type) {
    case types.ADD_PAGE:
      return merge({}, state, {
        [action.formId]: updateForm(state[action.formId], action)
      })
    default:
      if (action.entities && action.entities.forms)
        return merge({}, state, action.entities.forms)
      return state
  }
}

function updatePage(state = {
  name: '',
  questions: []
}, action) {
  switch (action.type) {
    case 'CREATE_QUESTION':
      return Object.assign({},state,{
        questions: [...state.questions, action.id]
      })
    case 'REMOVE_QUESTION':
      return Object.assign({},state,{
        questions: 
          [
          ...state.slice(0, action.index),
          ...state.slice(index + 1)
          ]
      })
        state.questions
      .slice(0, index)
      .concat(state.slice(index + 1))
    case types.MOVE_QUESTION:
      const { questions } = state
      const newQuestions = state.questions
      const dragQuestion = questions[action.dragIndex]
      newQuestions.splice(action.dragIndex, 1)
      newQuestions.splice(action.hoverIndex, 0, dragQuestion)
      return Object.assign({},state,{
        questions: newQuestions
      })
      //[
      //  ...questions.slice(0, action.hoverIndex),
      //  questions[action.dragIndex],
      //  ...questions.slice(action.hoverIndex, 1)
      //]
    default: 
      return state
  }
}

const pages = (state = {}, action) => {
  switch(action.type) {
    case types.ADD_PAGE: 
      return Object.assign({}, state, {
        [action.pageId]: 
          action.page
      })
    case 'UPDATE_PAGE':
      return Object.assign({},
        state, {
        [action.pageId]: action.page
      })
    case types.MOVE_QUESTION: 
    case 'CREATE_QUESTION':
      return merge({}, state, {
        [action.pageId]: updatePage(state[action.pageId], action)
      })
    default:
      if (action.entities && action.entities.pages)
        return merge({}, state, action.entities.pages)

      return state
  }
}

const questions = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_QUESTION': 
      return Object.assign({}, state, {
        [action.id]: action.question
      })
    case 'UPDATE_QUESTION':
      return Object.assign({}, state, {
        [action.id]: action.question
      })
    default:
      if (action.entities && action.entities.questions)
        return merge({}, state, action.entities.questions)

      return state
  }
}

//function forms(state = {}, action) {
//  switch (action.types) {
//    case ADD_PAGE: 
//      return Object.assign({},state, {
//        pages: state.pages.push(pageId)
//      })
//    default:
//      return state
//  }
//}

//const getForms = (state) => {
//  const result = state.forms.get('result')
//  return result.map(id => state.entities.getIn(['forms',id]))
//}

// returns forms list with list of pages and questions
//function forms(state = initialState.forms, action) {
//  switch (action.type) {
//    case types.FORM_REQUEST:
//      return Object.assign({}, state, {
//        [action.formId]: {
//          isFetching: true,
//          pages: []
//        },
//      })
//    case types.FORM_SUCCESS: 
//      return Object.assign({}, state, {
//        [action.formId]: {
//          name: action.name,
//          isFetching: false,
//          lastUpdates: action.receivedAt,
//          pages: pages(state[action.formId].pages,action)
//        },
//      })
//    case types.ADD_PAGE:
//      return Object.assign({}, state, {
//        [action.formId]: {
//          pages: pages(state[action.formId].pages,action)
//        },
//      })
//    default:
//      return state;
//  }
//}

//function pages(state = [], action){
//  switch (action.type) {
//    case types.FORM_SUCCESS:
//      return action.pages
//    case types.ADD_PAGE:
//      return [
//        ...state,
//        {
//          id: action.pageId,
//          name: '',
//          formId: action.formId
//        }
//      ]
//    default:
//      return state
//  }
//}


const rootReducer = combineReducers({
  selectedForm,
  forms,
  pages,
  questions,
  routing: routerReducer
})

export default rootReducer