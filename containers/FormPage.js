import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchForm } from '../actions'
import PageList from '../components/PageList';
import SideMenu from '../components/SideMenu';
import merge from 'lodash/merge'

class Form extends Component {
  constructor(props) {
    super();
    this.save = this.save.bind(this);
    this.createPage = this.createPage.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }
  componentDidMount() {
    const { dispatch,  params: { id } } = this.props
    dispatch(fetchForm(id))  
  }
  save(e) {
    e.preventDefault();
    var form = {
      name: this.state.name,
      meta: this.state.meta,
      pages: this.state.pages
    };

    $.ajax({
      url:'/api/forms/' + this.props.params.id,
      method: 'PUT',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(form)
    })
    .done((data)=>{
      console.log('PUT data', data);
    });

  }
  createPage(page) {
    var pages = this.state.pages;
    pages.push(page);
    console.log('pages',pages);
    this.setState({pages:pages});
  }
  updatePage(page){
    var pages = this.state.pages;
    var index = pages.findIndex(p => p._id == page._id);
    pages[index] = page;
    console.log('pages',pages);
    this.setState({pages:pages});
  }
  openMenu(e){
    e.preventDefault();
    console.log('open menu');
  }
  render() {
    const { isFetching, name, pages, id } = this.props

    if (!pages){
      return <h1>Loading Form...</h1>
    }

    return (
      <div >
       <SideMenu title="Options" direction="right"/>
        <div className="fixed-header flex flex-row">
          <h1 className="flex__item">{this.props.name}</h1>
          <button className="button--raised" onClick={this.save}>
            preview
          </button>
          <a href="#side-menu" title="Open Options menu">
            <i className="material-icons">more_vert</i>
          </a>
        </div>
        <div className="form">
          <PageList pages={pages} formId={id} />
          <datalist id="types">
              <option value="text" />
              <option value="drop down" />
              <option value="radio" />
              <option value="date" />
          </datalist>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {
    selectedForm,
    forms, pages, questions 
  } = state

  const form = forms[selectedForm] || { pages: [] }
  const formPages = form.pages.map(id => pages[id])

  return {
    id: selectedForm,
    name: form.name,
    pages: formPages
  }
}

export default connect(mapStateToProps)(Form);