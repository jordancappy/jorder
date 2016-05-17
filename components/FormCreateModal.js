import React from 'react';

class FormCreateModal extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }
  save(e) {
    e.preventDefault();
    var title = this.refs.title.value;
    var data = $( "#create-form-modal form" ).serialize();
    if (title)
      this.props.save(data);
  }
  render() {
    return (
      <div id="create-form-modal" className="modal fade" role="dialog">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times; </span></button>
              <h4 className="modal-title">Create Form</h4>
            </div>
            <form onSubmit={this.save}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" name="name" className="form-control"
                    ref="title" val={this.props.title}/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FormCreateModal;