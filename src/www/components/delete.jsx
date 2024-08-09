import React from 'react';
import { records } from "../../declarations";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const $ = document.getElementById.bind(document);
const idl = require('../utilities/idl');

class Delete extends React.Component {
  constructor() {
    super();
    this.state = { success: null };
  }

  delete(event) {
    event.preventDefault();
    const recordId = parseInt($('delete-record-id').value, 10);
    records.delete(recordId).then((success) => {
      this.setState({ success });
      if (success) {
        console.log('Delete successful');
      } else {
        console.log('Delete failed');
      }
      this.props.refreshData();
      const deleteModal = window.bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
      deleteModal.hide();
    }).catch((error) => {
      console.error("Failed to delete record:", error);
    });
  }

  handleDeleteClick(id) {
    this.setState({ deleteId: id });
    const deleteModal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-danger mb-4" data-bs-toggle="modal" data-bs-target="#deleteModal">
          Delete
        </button>

        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Delete a Record</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.delete.bind(this)}>
                  <div className="mb-3">
                    <label htmlFor="delete-record-id" className="form-label">Identifier:</label>
                    <input id="delete-record-id" type="number" className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-danger">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Delete;
