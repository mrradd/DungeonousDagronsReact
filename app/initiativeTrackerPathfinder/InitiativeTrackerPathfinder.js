import React from 'react';
import Clock from './Clock.js';
import DataGrid from './Datagrid.js';
import TurnIndicator from './TurnIndicator.js'

/******************************************************************************
* Class InitiativeTrackerPathfinder *
* Base for the Initiative Tracker for Pathfinder.
******************************************************************************/
export class InitiativeTrackerPathfinder extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div>
        <h1>Test</h1>
        <Clock/>
        <TurnIndicator/>
        <DataGrid/>
      </div>
    );
  }
}
