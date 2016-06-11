import React from 'react';

class FormBlock extends React.Component {
  render(){
    return(
    	<div className="flex__item card">        
        <div className="title">
          <i className="material-icons" title="edit">more_vert</i>
          <h1>{this.props.name}</h1>
        </div>
        <div className="actions">
          <a className="button" 
            href={"/create/"+ this.props.id}>edit</a>
          <a className="button" 
            href={"/form/" + this.props.id}>preview</a>
          <a className="button button--raised" 
            href={"/stats/" + this.props.id}>stats</a>
        </div>
      </div>
    );
  }
}

export default FormBlock;