import React from 'react';
import Page from './Page';

class Form extends React.Component {
  constructor(props){
    super();
  }
  componentDidMount(){
    $.get('/api/forms',function(data){
      console.log('data',data);
    })
  }
  render() {
      return(
          <div className="form">
            <h1>{this.props.title}</h1>
            {this.props.pages.map((x,i)=> 
              <Page key={i} title={x.title} questions={x.questions}/>
            )}
          </div>
      );
  }
}

export default Form;