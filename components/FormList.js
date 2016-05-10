import React from 'react';
import FormBlock from './FormBlock';

class FormList extends React.Component {
  constructor(props){
    super();
    this.state = {forms: []};
  }
  componentDidMount(){
    this.loadForms();  
  } 
  loadForms(){
    $.get('/api/forms', (data)=>{
        data= [{name:'form'}];
        console.log('data',data); 
        this.setState({'forms': data});
    });
  }
  createForm(){
      console.log('you will create a form one day');
  }
  render(){
      return(
        <div className="form-list">
            <h2>My Forms</h2>
            {this.state.forms.map((v,i)=>{
                return <FormBlock key={i} name={v.name}/>
            })}
            <div className="col-sm-6 col-md-3 panel panel-default"
                onClick={this.createForm}>
                <h3>Create New Form</h3>
            </div>
        </div>
      );
  } 
}

export default FormList;