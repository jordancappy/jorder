import React from 'react';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      type: '',
      name: '',
      answers: [{name:''}],
      showOptions: false
    };
    this.updateType = this.updateType.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.options = this.options.bind(this);
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
  options(e) {
    this.setState({
      showOptions: !this.state.showOptions
    })
  }
  render(){
    return (
      <div className="question">
        <div>
          <input name="type" list="types"
            onChange={this.updateType}
            value={this.state.type}
            placeholder="Question type"
            pattern="text|drop down|radio|date"
            required
          />
        </div>
        <div className="fancy">
          <input name="name" 
            onChange={this.updateName}
            value={this.state.name}
            required/>
          <label htmlFor="name">Question</label>
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
        <div className={this.state.showOptions ? "content" : "hidden"}>
          <h3>options</h3>
          <hr />
          <div className="flex flex--row">
            <span className="flex__item">Required field</span>
            <input 
              type="checkbox"
              id={this.props.index + "-required"}
              name="required"
              className="item-1"
              hidden />
            <label htmlFor={this.props.index + "-required"}
              className="switch" />
          </div>
          <br />
          <div className="flex flex--row">
            <span className="flex__item">Conditional Question</span>
            <input 
              type="checkbox"
              id={this.props.index + "-conditional"}
              name="required"
              className="item-1"
              hidden />
            <label htmlFor={this.props.index + "-conditional"}
              className="switch switch--state" />
          </div>
        </div>
        <div className="actions">
          <i className="material-icons" title="required">*</i>
          <i className="material-icons" title="archive">archive</i>
          <i className="material-icons" title="more">more_vert</i>
          <i className="material-icons"
            title="options"
            onClick={this.options}>
            {this.state.showOptions ? "expand_less" : "expand_more"}
          </i>
        </div>
      </div>
    );
  }
}

export default Question;