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
  createForm(data) {    
    $.post('/api/forms', data, (data) => {
      loadForms();
    })
  }
  render() {
    return (
      <div className="form-list">
        <h2>My Forms</h2>
        <div className="flex flex--row">
          {this.state.forms.map((v, i) => {
            return <FormBlock key={i} name={v.name}
                    id={v._id}/>
          })}
          <div className="flex__item card"
            data-toggle="modal" data-target="#create-form-modal">
            <div className="title">
              <h1>Create new form...</h1>
            </div>
          </div>
        </div>
        <FormCreateModal save={this.createForm}/>
      </div>
    );
  }
}

export default FormList;