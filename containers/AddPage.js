import React from 'react'
import { connect } from 'react-redux'
import { addPage } from '../actions'

let AddPage = ({ dispatch, formId }) => {
  return (
    <div className="card">
      <button 
        className="button button--block"
        onClick={ e => {
          dispatch(addPage(formId))
        }}>
        add page
      </button>
    </div>
  ) 
}

AddPage = connect()(AddPage)

export default AddPage