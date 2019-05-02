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
        <DataGrid/>
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

const turnOwnerRow = () => {
  return(
    
  );
}

/******************************************************************************
* Class DataGrid *
* Displays a list of the characters and some info about them.
******************************************************************************/
class DataGrid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rows: [],
      columns: [
        {key:'name',       name:'Name',       editable: true},
        {key:'initiative', name:'Initiative', editable: true},
        {key:'hp',         name:'HP',         editable: true},
        {key:'ac',         name:'AC',         editable: true},
        {key:'spellDC',    name:'Spell DC',   editable: true},
        {key:'notes',      name:'Notes',      editable: true}
      ],
      idCounter: 0
    };
  }
  
  /**
   * Adds a row to the row list.
   */
  addRow = () => {
    var idCounter = this.state.idCounter + 1;
    var rows = this.state.rows.slice();
    rows.push({id:idCounter, name: "derp " + idCounter});
    
    this.setState({idCounter: idCounter, rows: rows, turnOwner: false});
  };
  
  /**
   * Updates the turn index to the next character.
   */
  nextTurn = () => {
    var rows           = this.state.rows;
    var turnOwnerIndex = -1;

    /** Find the turn owner. */
    for(var i = 0; i < rows.length - 1; i++){

      /** Update turn owner to next character. */
      if(rows[i].turnOwner){
        
        /** Clear out current turn owner. */
        turnOwnerIndex = i;
        rows[turnOwnerIndex].turnOwner = false;
        
        /** Go to index 0 since we are going out of bounds. */
        if(turnOwnerIndex + 1 > rows.length - 1){
          rows[0].turnOwner = true;
        }
        
        /** Set the index to next character. */
        else{
          rows[turnOwnerIndex + 1].turnOwner = true;
        }

        break;
      }
    }

    /** No turn owner was found, so set it the the 0 index. */
    if(turnOwnerIndex < 0){
      rows[0].turnOwner = true;
    }

    this.setState({rows: rows});
  }

  /**
   * Allows the grid to be updated.
   */
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  /**
   * Updates the turn index to the previous character.
   */
  prevTurn = () => {

  }

  render(){
    return (
      <div>
        <button onClick={this.addRow}>Add Character</button>
        <button onClick={this.nextTurn}>Next Turn</button>
        <button onClick={this.prevTurn}>Previous Turn</button>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={500}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
      </div>
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
