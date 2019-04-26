import React from 'react';
import ReactDOM from 'react-dom';
import ReactDataGrid from 'react-data-grid';

/******************************************************************************
* Class InitiativeTracker5e *
* Base for the Initiative Tracker for 5th Edition DnD.
******************************************************************************/
export class InitiativeTracker5e extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    //return <h1>Initiative Tracker for D&D 5th Edition</h1>;
    return (
      <div>
        <h1>Test</h1>
        <Clock/>
        <TurnIndicator/>
        <ActionButtons/>
        <DataGrid/>
      </div>
    );
  }
}

/******************************************************************************
* Class ActionButtons *
* Buttons that allow some interaction with the datagrid.
******************************************************************************/
class ActionButtons extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div>
        <h3>This is where some buttons go.</h3>
      </div>
    );
  }
}

/******************************************************************************
* Class Clock *
* Displays minutes, seconds, and rounds that have elapsed.
******************************************************************************/
class Clock extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div>
        <h3>This is where the clock goes.</h3>
      </div>
    );
  }
}

/******************************************************************************
* Class DataGrid *
* Displays whose turn it is.
******************************************************************************/
class DataGrid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rows: [{id: 0, name: 'derp'}],
      columns: [{key:'id', name: 'ID'}, {key:'name', name:'Name'}],
      idCounter: 0
    };
  }
  
  createRows = () => {
    var rows = [{id: this.state.idCounter, name: 'derp'}];
    
    this.state.setState({rows: rows});
    
    return rows;
  };
  
  addRow = () => {
    var idCounter = this.state.idCounter++;
    var rows = this.state.rows.slice();
    rows.push({id:idCounter, name: "derp " + idCounter});
    
    this.state.setState({idCounter: idCounter, rows: rows});
  };
  
  createColumns = () => {
    return [{key:'id', name: 'ID'}, {key:'name', name:'Name'}];
  };
  
  render(){
    return (
      <ReactDataGrid
        columns={this.state.columns}
        rowGetter={i => this.state.rows[i]}
        rowsCount={500}
      />
    );
  }
}

/******************************************************************************
* Class TurnIndicator *
* Displays whose turn it is.
******************************************************************************/
class TurnIndicator extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div>
        <h3>This is where the turn indicator goes.</h3>
      </div>
    );
  }
}
