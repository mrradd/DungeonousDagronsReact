import React from 'react';
import DataRow from './DataRow.js'

/******************************************************************************
* Class DataGrid *
* Displays a list of the characters and some info about them.
******************************************************************************/
export default class DataGrid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rows: [],
      columns: [
        'Name',
        'Initiative',
        'HP',
        'AC',
        'CMB',
        'CMD',
        'Notes'
      ],
      idCounter: 0
    };
    this.ref = React.createRef();
  }

  /**
   * Adds a row to the row list.
   */
  addRow = () => {
    var rows = this.state.rows.slice();
    var id = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
    rows.push(<DataRow key={id} id={id} ref={this.ref}></DataRow>);
    
    this.setState({rows: rows});
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
        <table>
          <tbody>
            <tr key={0} id={0}>
              <th>{this.state.columns[0]}</th>
              <th>{this.state.columns[1]}</th>
              <th>{this.state.columns[2]}</th>
              <th>{this.state.columns[3]}</th>
              <th>{this.state.columns[4]}</th>
              <th>{this.state.columns[5]}</th>
              <th>{this.state.columns[6]}</th>
            </tr>
            {this.state.rows}
          </tbody>
        </table>
      </div>
    );
  }
}