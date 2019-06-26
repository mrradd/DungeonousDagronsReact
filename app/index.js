import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {InitiativeTrackerPathfinder} from './initiativeTrackerPathfinder/InitiativeTrackerPathfinder.js';

class App extends React.Component{
  render(){
    return(
      <div>
        <InitiativeTrackerPathfinder/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
