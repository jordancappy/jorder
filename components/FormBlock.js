import React from 'react';

class FormBlock extends React.Component {
  render(){
    return(
        <div className="col-sm-6 col-md-3 well">
            <h4>{this.props.name}</h4>
        </div>
    );
  }
}

export default FormBlock;