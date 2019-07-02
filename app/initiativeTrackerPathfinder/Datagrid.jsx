import React from 'react';
import DataRow from './DataRow.jsx';

/******************************************************************************
* Class DataGrid *
* Displays a list of the characters and some info about them.
*
* props
* incrementTurn()
* decrementTurn()
* updateName()
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
      ],
      getTurnOwnerName: this.getTurnOwnerName
    };

    this.rowRefs = []
  }

  /**
   * Adds a referencs to the ref list.
   * @param  ref  Reference to add.
   * 
   * NOTE: this actually gets called even on deletion. Who'd a thunk; probably has
   * to do with the fact that this function is in 'ref'.
   */
  addRef = (ref) => {
    if(ref){
      this.rowRefs.push(ref);
    }
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
    var rowRefs = this.rowRefs.slice();

    rows = rows.filter(function(row){return row.props.id != id; });

    this.rowRefs = rowRefs.filter(function(row){return row.props.id != id; });

    this.setState({rows: rows});
  };

  /**
   * Updates the current turnowner and the the turn owner's name.
   * @param  row      Data row of the turn owner.
   * @param  isOwner  Is this the owner of the turn.
   */
  updateTurnOwner = (row, isOwner) => {
    row.state.updateTurnOwner(isOwner);

    if(isOwner){
      this.props.updateName(row.state.name);
    }
  }

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
          this.updateTurnOwner(this.rowRefs[i], false);
          
          /** Go to index 0 since we are going out of bounds. */
          if(i + 1 >= this.rowRefs.length){
            this.props.incrementRound();
            this.updateTurnOwner(this.rowRefs[0], true);
          }
          
          /** Set the index to next character. */
          else if (this.rowRefs[i + 1]){
            this.updateTurnOwner(this.rowRefs[i + 1], true);
          }
          break;
        }
      }

      /** No turn owner was found, so set it the the 0 index. */
      if(!turnOwnerFound){
        this.updateTurnOwner(this.rowRefs[0], true);
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
          this.updateTurnOwner(this.rowRefs[i], false);
          
          /** If at the beginning of the list, go to the end of the list.*/
          if(i - 1 < 0){
            this.updateTurnOwner(this.rowRefs[this.rowRefs.length - 1], true);
            this.props.decrementRound();
          }
          else{
            this.updateTurnOwner(this.rowRefs[i - 1], true);
          }
        break;
        }
      }
      
      /** No turn owner was found, so set it the the 0 index. */
      if(!turnOwnerFound){
        this.updateTurnOwner(this.rowRefs[0], true);
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