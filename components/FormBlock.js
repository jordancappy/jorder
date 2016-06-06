import React from 'react';

class FormBlock extends React.Component {
  render(){
    return(
    	<div className="col-sm-6 col-md-3 card">        
        <div className="title">
          <i className="material-icons" title="edit">more_vert</i>
          <h1>{this.props.name}</h1>
        </div>
        <div className="actions">
          <a href={"/create/"+ this.props.id}>edit</a>
          <a href={"stats" + this.props.id}>stats</a>
        </div>
      </div>
    );
  }
}

export default FormBlock;