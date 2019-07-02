import React from 'react';
import Clock from './Clock.jsx';
import DataGrid from './Datagrid.jsx';
import TurnIndicator from './TurnIndicator.jsx';

/******************************************************************************
* Class InitiativeTrackerPathfinder *
* Base for the Initiative Tracker for Pathfinder.
******************************************************************************/
export class InitiativeTrackerPathfinder extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      round: 1,
      name: ''
    }

    this.ref = React.createRef();
  }
  
  /** Decrements the current round. Makes sure it doesn't go negative */
  decrementRound = () => {
    var r = this.state.round;
    r--;

    /** Make sure we don't go into negative rounds. */
    if(r < 1){
      r = 1;
    }
    
    this.setState({round: r});
  }

  /** Increments the current round. Makes sure it doesn't go negative */
  incrementRound = () => {
    var r = this.state.round;
    r++;
    this.setState({round: r});
  }

  /** Updates the name. */
  updateName = (name) => {
    this.setState({name: name});
  }

  render(){
    return (
      <div>
        <h1>Test</h1>
        <div>
          <h3>This is where the clock goes.</h3>
        </div>
        <div>
          <h3>Round: {this.state.round} - {this.state.name}</h3>
        </div>
        <DataGrid updateName={this.updateName} incrementRound={this.incrementRound} decrementRound={this.decrementRound}/>
      </div>
    );
  }
}
