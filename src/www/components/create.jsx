import React from 'react';
import { recordes } from "../../declarations";
const $ = document.getElementById.bind(document);
const idl = require('../utilities/idl');

class Create extends React.Component {
  constructor() {
    super();
    this.state = { recordId: null };
  }

  componentDidMount() {
    this.initializeRecordInput();
  }

  initializeRecordInput() {
    const container = $('create-records-container');
    container.innerHTML = `
      <label for="create-record-0" class="form-label">Content:</label>
      <input id="create-record-0" type="text" class="form-control" />
    `;
  }

  create(event) {
    event.preventDefault();
    const name = $('create-name').value;
    const records = [];
    const content = $('create-record-0').value;
    records.push(content);
    const record = { name, records };
    record.records = idl.toList(record.records);
    recordes.create(record).then((recordId) => {
      this.setState({ recordId });
      // Close modal after creating the record
      const modalElement = document.getElementById('createModal');
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      } else {
        console.warn('Modal instance not found.');
      }
      this.props.refreshData(); // Refresh the data in ReadAll component
    }).catch((error) => {
      console.error('Error creating record:', error);
    });
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#createModal">
          Create
        </button>

        <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createModalLabel">Create a Record</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.create.bind(this)}>
                  <div className="mb-3">
                    <label htmlFor="create-name" className="form-label">Username:</label>
                    <input id="create-name" type="text" className="form-control" />
                  </div>
                  <div id="create-records-container" />
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
