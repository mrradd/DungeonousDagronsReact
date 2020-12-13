import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {InitiativeTracker5e} from './initiativeTracker5e/InitiativeTracker5e.jsx';

class App extends React.Component{
  render(){
    return(
      <div>
        <InitiativeTracker5e/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
