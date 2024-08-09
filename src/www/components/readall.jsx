import React from "react";
import { records } from "../../declarations";
import Create from "./create.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const idl = require("../utilities/idl");

class ReadAll extends React.Component {
  constructor() {
    super();
    this.state = { records: [], deleteId: null, success: null };
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.readAll();
  }

  async readAll() {
    try {
      let recordsList = [];

      for (let i = 0; i < 100; i += 10) {
        let batch = [];
        for (let j = i; j < i + 10 && j < 100; j++) {
          let result = await records.read(j);
          let record = idl.fromOptional(result);
          if (record) {
            record.content = idl.fromList(record.content);
            batch.push({ id: j, ...record });
          }
        }
        recordsList = [...recordsList, ...batch];
      }

      this.setState({ records: recordsList });
    } catch (error) {
      console.error("Failed to read all records:", error);
    }
  }

  refreshData() {
    this.readAll();
  }

  handleDeleteClick(id) {
    this.setState({ deleteId: id }, () => {
      const deleteModal = new window.bootstrap.Modal(
        document.getElementById("deleteModal")
      );
      deleteModal.show();
    });
  }

  confirmDelete(event) {
    event.preventDefault();
    const recordId = parseInt(
      document.getElementById("delete-record-id").value,
      10
    );
    records
      .delete(recordId)
      .then((success) => {
        this.setState({ success });
        if (success) {
          console.log("Delete successful");
          this.refreshData();
          const deleteModal = window.bootstrap.Modal.getInstance(
            document.getElementById("deleteModal")
          );
          deleteModal.hide();
        } else {
          console.log("Delete failed");
        }
      })
      .catch((error) => {
        console.error("Failed to delete record:", error);
      });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center my-4">Read All Records</h2>
        <div className="d-flex mb-4">
          <Create refreshData={this.refreshData} />
          <button
            type="button"
            className="btn btn-danger mx-2"
            style={{
              height: "50%",
              paddingTop: "0.375rem",
              paddingBottom: "0.375rem",
            }}
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            Delete a Record
          </button>
        </div>

        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map((record, index) => (
              <tr key={index}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.content.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Delete a Record
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.confirmDelete.bind(this)}>
                  <div className="mb-3">
                    <label htmlFor="delete-record-id" className="form-label">
                      Identifier:
                    </label>
                    <input
                      id="delete-record-id"
                      type="number"
                      className="form-control"
                      value={this.state.deleteId || ""}
                      onChange={(e) =>
                        this.setState({ deleteId: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-danger">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReadAll;
