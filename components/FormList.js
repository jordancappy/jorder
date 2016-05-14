import React from 'react';
import FormBlock from './FormBlock';
import FormCreateModal from './FormCreateModal';

class FormList extends React.Component {
  constructor(props) {
    super();
    this.state = { forms: [] };
  }
  componentDidMount() {
    this.loadForms();
  }
  loadForms() {
    $.get('/api/forms', (data) => {
      this.setState({ 'forms': data });
    });
  }
  createForm(title) {    
    var data = $( "#create-form-modal form" ).serialize();
    
    $.post('/api/forms', data, (data) => {
      loadForms();
    })
  }
  render() {
    return (
      <div className="form-list">
        <h2>My Forms</h2>
        {this.state.forms.map((v, i) => {
          return <FormBlock key={i} name={v.name}/>
        }) }
        <a className="col-sm-6 col-md-3 well text-center"
          data-toggle="modal" data-target="#create-form-modal">
          <h4>Create new form...</h4>
        </a>
        <FormCreateModal save={this.createForm}/>
      </div>
    );
  }
}

export default FormList;