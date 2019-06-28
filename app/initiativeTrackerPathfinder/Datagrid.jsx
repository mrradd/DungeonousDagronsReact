import React from 'react';
import DataRow from './DataRow.jsx';

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
        '',
        'Name',
        'Initiative',
        'HP',
        'AC',
        'CMB',
        'CMD',
        'Notes'
      ]
    };

    this.rowRefs = []
  }

  /**
   * Adds a referencs to the ref list.
   * @param  ref  Reference to add.
   */
  addRef = (ref) => {
    this.rowRefs.push(ref);
  }

  /**
   * Adds a row to the row list.
   */
  addRow = () => {
    var rows = this.state.rows.slice();
    var id = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
    var row = <DataRow key={id} id={id} ref={this.addRef} deleteRow={this.deleteRow}></DataRow>;
    rows.push(row);
    this.setState({rows: rows});
  };
  
  /**
   * Delete a row from the row list for given id.
   * @param  id  ID of row to delete.
   */
  deleteRow = (id) => {
    var rows = this.state.rows.slice();
    rows = rows.filter(function(row){return row.props.id != id; });

    //TODO CH  FOR SOME REASON EVEN THOUGH AN ELEMENT IS REMOVED FROM ROWREFS
    //AND ITS LENGTH IS 1 LESS HERE; LATER USE SHOWS IT HAS ONE MORE ELEMENT THAN IT SHOULD
    //AND THAT ELEMENT IS ALWAYS NULL.
    this.rowRefs = this.rowRefs.filter(function(row){return row.props.id != id; });

    this.setState({rows: rows});
  };

  /**
   * Updates the turn index to the next character.
   */
  nextTurn = () => {
    var turnOwnerFound = false;

    if(this.rowRefs.length > 0){
      /** Find the turn owner. */
      for(var i = 0; i < this.rowRefs.length; i++){

        /** Update turn owner to next character. */
        if(this.rowRefs[i] && this.rowRefs[i].state.turnOwner){
          
          /** Clear out current turn owner. */
          turnOwnerFound = true;
          this.rowRefs[i].state.updateTurnOwner(false);
          
          /** Go to index 0 since we are going out of bounds. */
          //TODO CH ACCOMODATING THE STUPID NULL ELEMENT THAT KEEPS APPEARING AFTER DELETE.
          if(i + 1 >= this.rowRefs.length || !this.rowRefs[i+1]){
            this.rowRefs[0].state.updateTurnOwner(true);
          }
          
          /** Set the index to next character. */
          else if (this.rowRefs[i + 1]){
            this.rowRefs[i + 1].state.updateTurnOwner(true);
          }

          //TODO CH  FIND WAY TO UPDATE ROUNDS COUNTER
          break;
        }
      }

      /** No turn owner was found, so set it the the 0 index. */
      if(!turnOwnerFound){
        this.rowRefs[0].state.updateTurnOwner(true);
      }
    }
  };
  
  /**
   * Updates the turn index to the previous character.
   */
  prevTurn = () => {
    var turnOwnerFound = false;
    
    if(this.rowRefs.length > 0){
      /** Find turn owner. */
      for(var i = this.rowRefs.length - 1; i >= 0; i--){
        
        /** Update turn owner index to next character. */
        if(this.rowRefs[i] && this.rowRefs[i].state.turnOwner){
          turnOwnerFound = true;
          this.rowRefs[i].state.updateTurnOwner(false);
          
          /** If at the beginning of the list, go to the end of the list.*/
          if(i - 1 < 0){
            if(this.rowRefs[this.rowRefs.length - 1]){
              this.rowRefs[this.rowRefs.length - 1].state.updateTurnOwner(true);
            }
            else{
            //TODO CH ACCOMODATING THE STUPID NULL ELEMENT THAT KEEPS APPEARING AFTER DELETE.
            this.rowRefs[this.rowRefs.length - 2].state.updateTurnOwner(true);
            }
          }
          else{
            this.rowRefs[i - 1].state.updateTurnOwner(true);
          }
        
        //TODO CH  FIND WAY TO UPDATE ROUNDS COUNTER
        break;
        }
      }
      
      /** No turn owner was found, so set it the the 0 index. */
      if(!turnOwnerFound){
        this.rowRefs[0].state.updateTurnOwner(true);
      }
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
              <th>{this.state.columns[7]}</th>
            </tr>
            {this.state.rows}
          </tbody>
        </table>
      </div>
    );
  }
}