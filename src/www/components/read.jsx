import React from 'react';

import { records } from "../../declarations";

const $ = document.getElementById.bind(document);
const idl = require('../utilities/idl');

class Read extends React.Component {

  constructor() {
    super();
    this.state = { record: null };
  }

  read(event) {
    event.preventDefault();
    const recordId = parseInt($('read-record-id').value, 10);
    records.read(recordId).then((result) => {
      const record = idl.fromOptional(result);
      if (record) {
        record.superpowers = idl.fromList(record.superpowers);
      };
      this.setState({ record });
    });
  }

  render() {
    return (
      <div>
        <h2>Read a Record</h2>
        <form onSubmit={ this.read.bind(this) }>
          <label htmlFor="read-record-id">Identifier: </label>
          <input id="read-record-id" type="number"/>
          <br/>
          <button type="submit">Submit</button>
        </form>
        <div id="read-response">
          <pre>
            <code>{ JSON.stringify(this.state, null, 2) }</code>
          </pre>
        </div>
      </div>
    );
  }
}

export default Read;
