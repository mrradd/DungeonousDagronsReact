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
    var idCounter = this.state.idCounter;
    var rows = this.state.rows.slice();
    
    idCounter++;
    rows.push({id:idCounter, name: "derp " + idCounter, initiative: 0, hp: 0, ac: 0, spellDC: 0, notes: ''});
    
    this.setState({idCounter: idCounter, rows: rows, turnOwner: false});
  };
  
  /**
   * Delete a row from the row list.
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
        <DataTable headings={this.state.columns} data={this.state.rows}/>
      </div>
    );
  }
}

/******************************************************************************
* Class CharacterRow *
* Puts together data for a character on the table.
        <td key={idCounter++} id={idCounter}>{rows[i].initiative}</td>
        <td key={idCounter++} id={idCounter}>{rows[i].hp}</td>
        <td key={idCounter++} id={idCounter}>{rows[i].ac}</td>
        <td key={idCounter++} id={idCounter}>{rows[i].spellDC}</td>
        <td key={idCounter++} id={idCounter}>{rows[i].notes}</td>
******************************************************************************/
class DataTable extends React.Component {
  constructor(props){
    super(props);
    this.cellIDCounter = 0;
  }
  
  /**
   * Renders the header row.
   */
  renderHeaders = () => {
    var idCounter = this.cellIDCounter;
    
    let {headings} = this.props;

    return(
      <tr>
        <th key={idCounter++} id={idCounter}>{headings[0]}</th>
        <th key={idCounter++} id={idCounter}>{headings[1]}</th>
        <th key={idCounter++} id={idCounter}>{headings[2]}</th>
        <th key={idCounter++} id={idCounter}>{headings[3]}</th>
        <th key={idCounter++} id={idCounter}>{headings[4]}</th>
        <th key={idCounter++} id={idCounter}>{headings[5]}</th>
        <th key={idCounter++} id={idCounter}>{headings[6]}</th>
      </tr>);
  }
  
  /**
   * Assembles the row data.
   */
  renderRows = () => {
    var idCounter = this.cellIDCounter;
    
    let {data} = this.props;
    var rows = [];
    
    for(var i = 0; i < data.length; i++){
      /** Doing it with push because otherwise it wanted me to wrap the td with an element. */
      rows.push(
        <tr>
          <td key={idCounter++} id={idCounter}><input value={data[i].name}/></td>
          <td key={idCounter++} id={idCounter}><input value={data[i].initiative}/></td>
          <td key={idCounter++} id={idCounter}><input value={data[i].hp}/></td>
          <td key={idCounter++} id={idCounter}><input value={data[i].ac}/></td>
          <td key={idCounter++} id={idCounter}><input value={data[i].spellDC}/></td>
          <td key={idCounter++} id={idCounter}><input value={data[i].notes}/></td>
        </tr>
      );
    }
    
    return rows;
  }
  
  render() {
    return (
      <table className="Table">
      <tbody>
        {this.renderHeaders()}
        {this.renderRows()}
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
