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
