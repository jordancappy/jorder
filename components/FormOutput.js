import React, {Component} from 'react';


export default class FormOutput extends Component{
  constructor() {
    super();
    this.state = {
      page: 1,
      pages: []
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  componentDidMount(){
    $.get('/api/forms/' + this.props.params.id, (data) => {
      data.pages.push({name:'p2', questions:[{name:'ddsf',type:'dsfdsfd'},{name:'ddsf',type:'dsfdsfd'},{name:'ddsf',type:'dsfdsfd'}]});
      this.setState({
        pages: data.pages
      });
    });
  }
  nextPage(e){
    var nextPage = this.state.page + 1;
    this.setState({
      page: nextPage
    });
  }
  prevPage(e){
    var prevPage = this.state.page - 1;
    this.setState({
      page: prevPage
    });
  }
  render(){
    return(
      <div>
        {this.state.pages.map((x, i) => {
          return <div className={this.state.page == i + 1 ? "page": "hidden"}>
            <div className="title">
              <h1>{x.name}</h1>
            </div>
            <div className="content">
              {x.questions.map((q, i)=>{
                return <div className="fancy">
                  <input type={q.type} name={q.name}/>
                  <label>{q.name}</label>
                </div>
              })}
            </div>
            <div className="actions">
              <button className={this.state.page != 1 ? "raised": "hidden"}>
                previous
                </button>
                <button className={this.state.page < this.state.pages.length ?
                  "raised" : "hidden"}
                  onClick={this.nextPage}>
                  next
                </button>
                <button className={this.state.page == this.state.pages.length ?
                  "raised" : "hidden"}>
                  save
                </button>
            </div>
          </div> 
        }) }

      </div>
    )
  }
}