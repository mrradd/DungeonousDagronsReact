import React from 'react';

/******************************************************************************
* Class DataRow *
* Data for a single row.
******************************************************************************/
export default class DataRow extends React.Component {
  constructor(props){
    super(props);
    this.cellIDCounter = 0;
    this.state = {
      name: "",
      initiative: 0,
      hp: 0,
      ac: 0,
      cmb: 0,
      cmd: 0,
      notes: "",
      turnOwner: false,
      updateTurnOwner: this.updateTurnOwner
    };
  }

  /**
   * Deletes the row.
   */
  delete = () => {
    this.props.deleteRow(this.props.id);
  }

  /**
   * Handles the change event on the inputs and updates the appropriate state value.
   */
  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  updateTurnOwner = (turnOwner) => {
    this.setState({turnOwner: turnOwner});
  }

  render() {  
    return (
      <React.Fragment>
        <tr style={{backgroundColor: this.state.turnOwner ? 'blue' : 'white'}}>
          <td><button onClick={this.delete}>X</button></td>
          <td><input name="name"       value={this.state.name}       onChange={this.handleInputChange}/></td>
          <td><input name="initiative" value={this.state.initiative} onChange={this.handleInputChange}/></td>
          <td><input name="hp"         value={this.state.hp}         onChange={this.handleInputChange}/></td>
          <td><input name="ac"         value={this.state.ac}         onChange={this.handleInputChange}/></td>
          <td><input name="cmb"        value={this.state.cmb}        onChange={this.handleInputChange}/></td>
          <td><input name="cmd"        value={this.state.cmd}        onChange={this.handleInputChange}/></td>
          <td><input name="notes"      value={this.state.notes}      onChange={this.handleInputChange}/></td>
        </tr>
      </React.Fragment>
    );
  }
}