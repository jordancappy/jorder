import React from 'react';
import Question from './Question';

class Page extends React.Component {
  constructor() {
    super();
    this.state = { questions: [] };
    this.save = this.save.bind(this);
  }
  save(e) {
    e.preventDefault();
    var form = $('#page-create-form');
    //jquery validate?        
    //if(!form.validate) return;

    var data = {
      _id: this.props.id,
      name: this.refs.name.value,
      questions: this.state.questions
    };

    this.props.save(data);
  }
  render() {
    return (
      <div className="page panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.name}</h3>
        </div>
        <form id="page-create-form" onSubmit={this.save}>
          <input type="hidden" name="_form" value={this.props.form}/>
          <div className="panel-body">
            <div className="form-group">
                <label>Title</label>
                <input type="text" name="name" className="form-control" 
                  defaultValue={this.props.name}
                  ref="name" placeholder="Enter page name" />
            </div>
            <hr />
            <h5>Questions</h5>
            {this.state.questions.map((v, i) => {
                <Question key={i} name={v.name}/>
            }) }
            <Question save={this.createQuestion}/>
          </div>
          <div className="panel-footer">
            <button className="btn btn-primary">Save</button>
          </div>     
        </form>
      </div>
    );
  }
}

export default Page;