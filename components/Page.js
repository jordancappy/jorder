import React from 'react';
import Question from './Question';

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      name:'',
      questions: []
    };
    this.save = this.save.bind(this);
    this.updateName = this.updateName.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }
  componentDidMount() {
    this.setState({
      name: this.props.name,
      questions:this.props.questions
    });

    if (this.state.questions.length == 0)
      this.addQuestion();
  }
  save(e) {
    e.preventDefault();
    var page = {
      name: this.state.name,
      questions: this.state.questions
    };

    $.ajax({
      url: '/api/pages/' + this.props.id,
      type: 'PUT',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(page)
    })
    .done(data=>{
      console.log('page put', data);
    })
    .fail(data=>{
      alert('failed to put page', data);
    });
  }
  updateName(e) {
    e.preventDefault();
    var newName = e.target.value;
    this.setState({name:newName});
  }
  addQuestion(e) {
    var newQuestion = {name:""};
    var questions = this.state.questions;
    questions.push(newQuestion);
    this.setState({questions:questions});
  }
  render() {
    return (
      <div className="card-container">
        <div className="page">
          <form onSubmit={this.save}>
            <div className="title">
              <input placeholder='page title' 
                onChange={this.updateName}
                value={this.state.name} />
            </div>
            <div className="actions">
              <button className="blue">save</button>
              <button className="button--raised">ya mum</button>
              <button>the pain</button>
              <button>kill</button>
              <button>yourself</button>
            </div>
            <div>
              {this.state.questions.map((v, i) => {
                return <Question key={i} index={i} name={v.name} />
              }) }
            </div>
          </form>
          <button className="button--block"
            onClick={this.addQuestion}>add question
          </button>
        </div>
      </div>
    );
  }
}

export default Page;