import React from 'react';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      type: '',
      name: '',
      answers: [{name:''}]
    };
    this.updateType = this.updateType.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
  }
  ComponentDidMount() {
    this.setState({
      type: this.props.type,
      name: this.props.name
    });
  }
  updateType(e) {
    e.preventDefault();
    var answers = this.state.answers;
    if (e.target.value == 'text')
      answers = [];
    else
    {
      if(this.state.answers.length == 0)
      answers.push({name:''})
    }
    this.setState({
      type: e.target.value,
      answers: answers
    });
  }
  updateName(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }
  updateQuestion(e) {
    e.preventDefault();
    var question = e.target.value;
    console.log('question',question);
  }
  render(){
    return (
      <div className="question">
        <div>
          <input name="type" list="types"
            onChange={this.updateType}
            value={this.state.type}
            placeholder="Question type"
            pattern="text|drop down|radio"
            required
          />
        </div>
        <div className="fancy">
          <input name="name" 
            onChange={this.updateName}
            value={this.state.name}
            required/>
          <label for="name">Question</label>
        </div>
        <div className={this.state.type != 'text' ?
          'answer-list ' + this.state.type : 'hidden'}>
          {this.state.answers.map((v, i) => {
            return <div>
              <i className="material-icons" title="delete">cancel</i>
              <input 
                key={i}
                onChange={this.updateQuestion}
                placeholder="answer"
                value={v.name} />
            </div>
          }) }
        </div>
        <div className="actions">
          <i className="material-icons" title="archive">archive</i>
          <i className="material-icons" title="more">more_vert</i>
          <i className="material-icons" title="options">expand_more</i>
        </div>
      </div>
    );
  }
}

export default Question;