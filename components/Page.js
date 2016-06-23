import React from 'react';
import update from 'react/lib/update';
import QuestionList from './QuestionList';
import Question from './Question';

import { connect } from 'react-redux'
import { createQuestion, moveQuestion, updateQuestion } from '../actions'

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      questions: []
    };
    this.save = this.save.bind(this);
    this.updateName = this.updateName.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.moveQuestion = this.moveQuestion.bind(this);
  }
  componentDidMount() {
    this.setState({
      name: this.props.name,
      questions:this.props.questions
    });

    //if (this.state.questions.length == 0)
      //this.addQuestion();
  }
  save(e) {
    e.preventDefault();
    var page = {
      name: this.props.name,
      questions: this.props.questions
    };

    $.ajax({
      url: '/api/pages/' + this.props.id,
      type: 'PUT',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(page)
    })
    .done(data=>{
      console.log('page put', data);
      this.setState(update(this.state, {
        questions: data.questions
      }));
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
  saveQuestion(questionId, question) {
    const { dispatch } = this.props;
    dispatch(updateQuestion(questionId, question))
  }
  addQuestion(e) {
    const { dispatch, id } = this.props
    dispatch(createQuestion(id))
    //var newQuestion = {name:"",order: this.state.questions.length};
    //var questions = this.state.questions;
    //questions.push(newQuestion);
    //this.setState({questions:questions});
  }
  moveQuestion(dragIndex, hoverIndex, questionId) {
    var { dispatch, id: pageId } = this.props
    dispatch(moveQuestion(dragIndex, hoverIndex, questionId, pageId))

    //const { questions } = this.state;
    //const dragQuestion = questions[dragIndex];
//
    //this.setState(update(this.state, {
    //  questions: {
    //    $splice: [
    //      [dragIndex, 1],
    //      [hoverIndex, 0, dragQuestion]
    //    ]
    //  }
    //}));
  }
  render() {
    const { questions } = this.props 

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
              <QuestionList >
                {questions.map((v, i) => {
                  return <Question key={v.id} 
                    id={v.id}
                    index={questions.indexOf(v)} 
                    pageId={this.props.id}
                    name={v.name}
                    type={v.types}
                    saveQuestion={this.saveQuestion}
                    moveQuestion={this.moveQuestion} />
                }) }
              </QuestionList>
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

function mapStateToProps(state, ownProps) {
  const { pages, questions } = state

  const page = pages[ownProps.id] || { questions: [] }
  const pageQuestions = page.questions.map(id => questions[id])

  return {
    questions: pageQuestions
  }
}

export default connect(mapStateToProps)(Page)