import React, { Component, PropTypes } from 'react'
import Page from './Page'
import AddPage from '../containers/AddPage'

export default class PageList extends Component {
  render() {
    const { pages, formId } = this.props
    return (
      <div>
        {pages.map((x, i) =>
           <Page key={i} id={x._id} 
            name={x.name} 
            questions={x.questions}
            save={this.updatePage}/>
        ) }
        <div className="card-container">
          <AddPage formId={formId} />
        </div>
      </div>
    )
  }
}

PageList.propTypes = {
  pages: PropTypes.array.isRequired
}