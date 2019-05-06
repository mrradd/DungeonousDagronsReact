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
        'Name',
        'Initiative',
        'HP',
        'AC',
        'Spell DC',
        'Notes'
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
   * Delete a row to the row list.
   */
  deleteRow = () => {
    //TODO CH  FIND SELECTED ROW AND DELETE IT.
  };
  
  /**
   * Updates the turn index to the next character.
   */
  nextTurn = () => {
    var rows           = this.state.rows;
    var turnOwnerFound = false;

    if(rows.length > 0){
      /** Find the turn owner. */
      for(var i = 0; i < rows.length; i++){

        /** Update turn owner to next character. */
        if(rows[i].turnOwner){
          
          /** Clear out current turn owner. */
          turnOwnerFound = true;
          rows[i].turnOwner = false;
          
          /** Go to index 0 since we are going out of bounds. */
          if(i + 1 >= rows.length){
            rows[0].turnOwner = true;
          }
          
          /** Set the index to next character. */
          else{
            rows[i + 1].turnOwner = true;
          }

          //TODO CH  FIND WAY TO UPDATE ROUNDS COUNTER
          break;
        }
      }

      /** No turn owner was found, so set it the the 0 index. */
      if(!turnOwnerFound){
        rows[0].turnOwner = true;
      }

      this.setState({rows: rows});      
    }
  };
  
  /**
   * Updates the turn index to the previous character.
   */
  prevTurn = () => {
    var rows           = this.state.rows;
    var turnOwnerFound = false;
    
    if(rows.length > 0){
      /** Find turn owner. */
      for(var i = rows.length - 1; i >= 0; i--){
        
        /** Update turn owner index to next character. */
        if(rows[i].turnOwner){
          turnOwnerFound = true;
          rows[i].turnOwner = false;
          
          /** If at the beginning of the list, go to the end of the list.*/
          if(i - 1 < 0){
            rows[rows.length - 1].turnOwner = true;
          }
          else{
            rows[i - 1].turnOwner = true;
          }
        
        //TODO CH  FIND WAY TO UPDATE ROUNDS COUNTER
        break;
        }
      }
      
      /** No turn owner was found, so set it the the 0 index. */
      if(!turnOwnerFound){
        rows[0].turnOwner = true;
      }

      this.setState({rows: rows});      
    }
  };

  render(){
    return (
      <div>
        <button onClick={this.addRow}>Add Character</button>
        <button onClick={this.nextTurn}>Next Turn</button>
        <button onClick={this.prevTurn}>Previous Turn</button>
        <DataTable headings={this.state.columns} rows={this.state.rows}/>
      </div>
    );
  }
}

/******************************************************************************
* Class CharacterRow *
* Puts together data for a character on the table.
******************************************************************************/
class DataTable extends React.Component {
  
  render() {
    let {headings} = this.props;
    var cell = [];
    for (var i = 0; i < headings.length; i++){
      let cellID = `cell${i}`
      cell.push(<th key={cellID} id={cellID}>{headings[i]}</th>)
    }
    
    return (
      <table className="Table">
      <tbody>
        <tr>{cell}</tr>
      </tbody>
      
      </table>
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
