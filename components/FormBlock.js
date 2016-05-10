import React from 'react';

class FormBlock extends React.Component {
  render(){
    return(
        <div className="col-sm-6 col-md-3 panel panel-warning">
            <h3>{this.props.name}</h3>
        </div>
    );
  }
}

export default FormBlock;