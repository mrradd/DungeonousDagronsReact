import React from 'react';
import DataGrid from './Datagrid.jsx';

/******************************************************************************
* Class InitiativeTrackerPathfinder *
* Base for the Initiative Tracker for D&D 5th edition.
******************************************************************************/
export class InitiativeTracker5e extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      round: 1,
      seconds: '00',
      minutes: '00',
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

  /** Increments the current round and clock. */
  incrementRound = () => {
    var round = this.state.round;
    round++;

    var seconds = ((round * 6) % 60);
    var minutes = (Math.floor(round / 10));
    
    this.state.seconds = ("0" + seconds).slice(-2);
    this.state.minutes = ("0" + minutes).slice(-2);

    this.setState({round: round});
  }

  /** Updates the name.
   * 
   */
  updateName = (name) => {
    this.setState({name: name});
  }

  render(){
    return (
      <div>
        <h1>Initiative Tracker - 5e</h1>
        <div>
          <h3>{this.state.minutes} : {this.state.seconds} - Round: {this.state.round}</h3>
          <h3>{this.state.name.length > 0 ? this.state.name : "No Name"}'s Turn</h3>
        </div>
        <DataGrid round={this.state.round} updateName={this.updateName} incrementRound={this.incrementRound} decrementRound={this.decrementRound}/>
      </div>
    );
  }
}