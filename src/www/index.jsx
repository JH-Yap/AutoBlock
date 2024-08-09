import React from 'react';
import ReactDOM from 'react-dom';

import Create from './components/create.jsx';
import Read from './components/read.jsx';
import Delete from './components/delete.jsx';
import ReadAll from './components/readall.jsx';
import Login from './components/login.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class App extends React.Component {
  constructor() {
    super();
    this.state = { currentComponent: 'Login', isLoggedIn: false };
  }

  renderComponent() {
    switch (this.state.currentComponent) {
      case 'Create':
        return <Create />;
      case 'Read':
        return <Read />;
      case 'Delete':
        return <Delete />;
      case 'ReadAll':
        return <ReadAll />;
      case 'Login':
        return <Login onLoginSuccess={() => this.setState({ isLoggedIn: true, currentComponent: 'ReadAll' })} />;
      default:
        return <ReadAll />;
    }
  }

  setComponent(component) {
    this.setState({ currentComponent: component });
  }

  render() {
    return (
      <div>
        
        {this.renderComponent()}
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
