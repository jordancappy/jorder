import React from 'react';

class Question extends React.Component {
    render(){
        return (
            <div className="question">
            {this.props.name}
                <input type="text" className="form-control" /> 
            </div>
        );
    }
}

export default Question;