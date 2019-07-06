import React from 'react';
import DataRow from './DataRow.jsx';

/******************************************************************************
* Class DataGrid *
* Displays a list of the characters and some info about them.
* props
* incrementTurn()
* decrementTurn()
* updateName()
* round
******************************************************************************/
export default class DataGrid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rows: [
        {
          id: 0,
          name: '',
          initiative: 0,
          hp: 0,
          ac: 0,
          cmb: 0,
          cmd: 0,
          notes: '',
          turnOwner: false
        }
      ],
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
    var row = {
      id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
      name: '',
      initiative: 0,
      hp: 0,
      ac: 0,
      cmb: 0,
      cmd: 0,
      notes: '',
      turnOwner: false
    };

    rows.push(row);

    this.setState({rows: rows});
  };
  
  componentDidUpdate(){
    /** Make sure there is always a row, and to update the name of turn owner. */
    if(this.state.rows.length <= 0){
      this.updateName('');
      this.addRow();
    }
  }

  /**
   * Delete a row from the row list for given id.
   * @param  id  ID of row to delete.
   */
  deleteRow = (id) => {
    var rows = this.state.rows.slice();
    rows     = rows.filter(function(row){return row.id != id; });
    this.setState({rows: rows});
  };

  /**
   * Handles the change event on the inputs and updates the appropriate row.
   * @param  id     ID of row to change.
   * @param  event  Event from input being changed.
   */
  handleInputChange = (id, event) => {
    var rows  = this.state.rows.slice();
    var value = event.target.value;
    var name  = event.target.name;

    for(var i = 0; i < rows.length; i++){
      if(rows[i].id == id){
        /** Make sure value is an int. */
        if(name != 'name' && name != 'notes'){
          if(/^-?\d*$/.test(value)){
            value = Number(value);
          }
          else{
            return;
          }  
        }

        /** Update the name. */
        if(rows[i].turnOwner && name == 'name'){
          this.updateName(value);
        }

        rows[i][name] = value;
        this.setState({rows: rows});
        break;
      }
    }
  }

  /**
   * Moves row down one.
   * @param  id  ID of row to move.
   */
  moveDown = (id) => {
    var rows  = this.state.rows.slice();
    var index = 0;

    for(var i = 0; i < rows.length; i++){
      if(rows[i].id == id){
        if(i + 1 > rows.length){
          return;
        }

        index = i;
        break;
      }
    }

    var temp        = rows[index + 1];
    rows[index + 1] = rows[index];
    rows[index]     = temp;

    this.setState({rows: rows});
  }

  /**
   * Moves row up one.
   * @param  id  ID of row to move.
   */
  moveUp = (id) => {
    var rows  = this.state.rows.slice();
    var index = 0;
    
    for(var i = 0; i < rows.length; i++){
      if(rows[i].id == id){
        if(i - 1 < 0){
          return;
        }

        index = i;
        break;
      }
    }

    var temp        = rows[index - 1];
    rows[index - 1] = rows[index];
    rows[index]     = temp;

    this.setState({rows: rows});
  }

  /**
   * Updates the turn index to the next character.
   */
  nextTurn = () => {
    var rows = this.state.rows.slice();

    var turnOwnerFound = false;

    if(rows.length > 0){
      /** Find the turn owner. */
      for(var i = 0; i < rows.length; i++){

        /** Update turn owner to next character. */
        if(rows[i] && rows[i].turnOwner){
          
          /** Clear out current turn owner. */
          turnOwnerFound = true;
          this.updateTurnOwner(rows[i], false);
          
          /** Go to index 0 since we are going out of bounds. */
          if(i + 1 >= rows.length){
            this.props.incrementRound();
            this.updateTurnOwner(rows[0], true);
          }
          
          /** Set the index to next character. */
          else if (rows[i + 1]){
            this.updateTurnOwner(rows[i + 1], true);
          }
          break;
        }
      }

      /** No turn owner was found, so set it the the 0 index. */
      if(!turnOwnerFound){
        this.updateTurnOwner(rows[0], true);
      }
    }

    this.setState({rows:rows});
  };
  
  /**
   * Orders all rows by initiative. 
   */
  orderByInitiative = () => {
    var rows    = this.state.rows.slice();
    var swapped = false;
      
    do
      {
      swapped = false;
      
      for(var i = 0; i < rows.length - 1; i++)
        {
        if(rows[i].initiative > rows[i+1].initiative)
          {
          var temp    = rows[i];
          rows[i]     = rows[i + 1];
          rows[i + 1] = temp;
          swapped     = true;
          }
        }
      }
    while(swapped);

    this.setState({rows: rows});
  }

  /**
   * Updates the turn index to the previous character.
   */
  prevTurn = () => {
    var rows = this.state.rows.slice();

    var turnOwnerFound = false;
    
    if(rows.length > 0){
      /** Find turn owner. */
      for(var i = rows.length - 1; i >= 0; i--){
        
        /** We do not want to loop around if we are on round 1 and at the beginning of the list. */
        if(i - 1 < 0 && this.props.round <= 1){
          break;
        }

        /** Update turn owner index to next character. */
        if(rows[i] && rows[i].turnOwner){
          turnOwnerFound = true;
          this.updateTurnOwner(rows[i], false);
          
          /** If at the beginning of the list, stop.*/
          if(i - 1 < 0){
            this.updateTurnOwner(rows[0], true);
          }
          else{
            this.updateTurnOwner(rows[i - 1], true);
          }

        break;
        }
      }
      
      /** No turn owner was found, so set it the the 0 index. */
      if(!turnOwnerFound){
        this.updateTurnOwner(rows[0], true);
      }
    }

    this.setState({rows: rows});
  };

  /**
   * Maps row objects to elements.
   */
  renderRows(){
    var rows = this.state.rows.map((row) => {
      return (
        <DataRow
          key={row.id}
          id={row.id}
          name={row.name}
          initiative={row.initiative}
          hp={row.hp}
          ac={row.ac}
          cmb={row.cmb}
          cmd={row.cmd}
          notes={row.notes}
          turnOwner={row.turnOwner}
          handleInputChange={this.handleInputChange}
          deleteRow={this.deleteRow}
          updateName={this.updateName}
          moveDown={this.moveDown}
          moveUp={this.moveUp}
          >
        </DataRow>);
    });
    
    return rows;
  }

  /**
   * Calls the tracker's update name function.
   */
  updateName = (name) => {
    this.props.updateName(name);
  }

  /**
   * Updates the turn owner's name.
   * @param  id       Row id.
   * @param  isOwner  Is this the owner of the turn.
   */
  updateTurnOwner = (row, isOwner) => {
    var rows = this.state.rows.slice();
    var index = rows.indexOf(row);

    rows[index].turnOwner = isOwner;
    
    if(isOwner){
      this.props.updateName(rows[index].name);
    }
    
    this.setState({rows: rows});
  }

  render(){
    return (
      <div>
        <button onClick={this.addRow}>Add Character</button>
        <button onClick={this.nextTurn}>Next Turn</button>
        <button onClick={this.prevTurn}>Previous Turn</button>
        <button onClick={this.orderByInitiative}>Order by Initiative</button>
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
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}
