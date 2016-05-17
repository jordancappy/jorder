import React from 'react';

class Question extends React.Component {
  render(){
    return (
      <div className="question">
        <div className="form-group">
        <label>type</label>
        <input name="type" list="types" className="form-control" placeholder="Question type"/>
        </div>
        <div className="form-group">
        <label>name</label>
        <input type="text" name="name" className="form-control" placeholder="question name"/>
        </div> 
      </div>
    );
  }
}

export default Question;