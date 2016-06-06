import React from 'react';
import Page from './Page';
import SideMenu from './SideMenu';

class Form extends React.Component {
  constructor(props) {
    super();
    this.state = { pages: [], meta: {} };
    this.save = this.save.bind(this);
    this.createPage = this.createPage.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }
  componentDidMount() {
    $.get('/api/forms/' + this.props.params.id, (data) => {
      console.log('data', data);
      this.setState({
        name: data.name,
        meta: data.meta,
        created: new Date(data.created_at),
        lastUpdated: new Date(data.lastUpdated_at),
        pages: data.pages
      });
    });
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
    return (
      <div >
       <SideMenu title="Options" direction="right"/>
        <div className="row fixed-header">
          <div className="col-sm-9">
            <h1>{this.state.name}</h1>
          </div>
          <div className="col-sm-3">
            <button className="raised" onClick={this.save}>
              preview
            </button>
            <a href="#side-menu" title="Open Options menu">
              <i className="material-icons">more_vert</i>
            </a>
          </div>
        </div>
        <div className="form">
          {this.state.pages.map((x, i) =>
             <Page key={i} id={x._id} name={x.name} 
              questions={x.questions}
              save={this.updatePage}/>
          ) }
          <div className="card-container">
            <button className="card block" onClick={this.createPage}>add page</button>
          </div>
          <datalist id="types">
              <option value="text" />
              <option value="drop down" />
              <option value="radio" />
          </datalist>
        </div>
      </div>
    );
  }
}

export default Form;