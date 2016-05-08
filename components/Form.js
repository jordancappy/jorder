import React from 'react';
import Page from './Page';

class Form extends React.Component {
  constructor(props){
    super();
  }
  render() {
      return(
          <div className="form">
            <h1>{this.props.title}</h1>
            {this.props.pages.map((x,i)=> 
              <Page key={i} title={x.title} />
            )}
          </div>
      );
  }
}

export default Form;