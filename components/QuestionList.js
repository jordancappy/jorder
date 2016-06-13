import React, { Component, PropTypes } from 'react';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { ItemTypes } from './Constants';


class QuestionList extends Component  {
  render(){
    return (
      <div className="question-list">
        {this.props.children}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)
(QuestionList);