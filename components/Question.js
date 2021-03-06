import React, { Component, PropTypes} from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd'; 
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

import flow from 'lodash/flow';

const questionSource = {
  beginDrag(props) {
    return {
      index: props.index,
      questionId: props.id
    };
  }
};

function collect(dragConnect, monitor) {
  return {
    connectDragSource: dragConnect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const listTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const questionId = monitor.getItem().questionId
    const hoverIndex = props.index;

    if (dragIndex == hoverIndex)
      return;

    props.moveQuestion(dragIndex, hoverIndex, questionId);

    monitor.getItem().index = hoverIndex;
  }
};

function dropCollect(dragConnect, monitor) {
  return {
    connectDropTarget: dragConnect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      name: this.props.name,
      answers: [{name:''}],
      showOptions: false
    };
    this.updateType = this.updateType.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.options = this.options.bind(this);
  }
  updateType(e) {
    e.preventDefault();
    let question = {
      id: this.props.id,
      name: this.props.name,
      type: e.target.value,
      answers: this.props.answers || []
    }
    this.props.saveQuestion(this.props.id, question)
  }
  updateName(e) {
    e.preventDefault();
    let question = {
      id: this.props.id,
      name: e.target.value,
      type: this.props.type
      ,
      answers: this.props.answers || []
    }
    this.props.saveQuestion(this.props.id, question)
  }
  updateAnswer(e) {
    e.preventDefault();
    var question = e.target.value;
    console.log('question',question);
  }
  save() {
    let question = {
      name: this.state.name,
      type: this.state.type,
      order: this.props.index,
      answers: this.props.answers || []
    };
    this.props.saveQuestion(this.props.id,question);
  }
  options(e) {
    this.setState({
      showOptions: !this.state.showOptions
    })
  }
  render() {
    const { connectDragSource, isDragging,
      connectDropTarget, isOver } = this.props;

    return connectDropTarget(connectDragSource(
      <div className="question"
        style={{
          opacity: isDragging ? 0 : 1,
          border: isOver ? '1px solid black' : ''
       }}>
        <div>
          <input name="type" list="types"
            onChange={this.updateType}
            value={this.props.type}
            placeholder="Question type"
            pattern="text|drop down|radio|date"
            required
          />
        </div>
        <div className="fancy">
          <input name="name" 
            onChange={this.updateName}
            value={this.props.name}
            required/>
          <label htmlFor="name">Question</label>
        </div>
        <div className={this.state.type != 'text' ?
          'answer-list ' + this.state.type : 'hidden'}>
          {this.state.answers.map((v, i) => {
            return <div key={i}>
              <i className="material-icons" title="delete">cancel</i>
              <input 
                key={i}
                onChange={this.updateAnswer}
                placeholder="answer"
                value={v.name} />
            </div>
          }) }
        </div>
        <div className={this.state.showOptions ? "content" : "hidden"}>
          <h3>options</h3>
          <hr />
          <div className="flex flex--row">
            <span className="material-icons text-center flex__item">*</span>
            <span className="flex__item--3">Required field</span>
            <input 
              type="checkbox"
              id={`${this.props.index}-required`}
              name="required"
              hidden />
            <label htmlFor={`${this.props.index}-required`}
              className="switch" />
          </div>
          <br />
          <div className="flex flex--row">
            <span className="flex__item">Conditional Question</span>
            <input 
              type="checkbox"
              id={`${this.props.index}-conditional`}
              name="required"
              className="item-1"
              hidden />
            <label htmlFor={`${this.props.index}-conditional`}
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
    ));
  }
}

Question.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default flow(
  DragSource(ItemTypes.QUESTION,questionSource,collect),
  DropTarget(ItemTypes.QUESTION,listTarget,dropCollect)
  )(Question);