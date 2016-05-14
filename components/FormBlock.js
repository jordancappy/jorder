import React from 'react';

class FormBlock extends React.Component {
  render(){
    return(
        <a className="col-sm-6 col-md-3 well"
           href={"/create/"+ this.props.id}>
            <h4>{this.props.name}</h4>
        </a>
    );
  }
}

export default FormBlock;