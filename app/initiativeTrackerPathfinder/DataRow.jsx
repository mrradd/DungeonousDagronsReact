import React from 'react';

/******************************************************************************
* Class DataRow *
* Data for a single row. Also has buttons to delete row, and move it up and
* down.
*
* props
* deleteRow()
* handleInputChange()
* moveUp()
* moveDown()
* id
* name
* initiative
* hp
* ac
* cmb
* cmd
* notes
* turnOwner
******************************************************************************/
export default class DataRow extends React.Component {
  constructor(props){
    super(props);
  }

  /**
   * Deletes the row.
   */
  deleteRow = () => {
    this.props.deleteRow(this.props.id);
  }

  /**
   * Handles the change event on the inputs and updates the appropriate state value.
   */
  handleInputChange = () => {
    this.props.handleInputChange(this.props.id, event);
  }

  /**
   * Moves the row down.
   */
  moveDown = () => {
    this.props.moveDown(this.props.id);
  }

  /**
   * Moves the row up.
   */
  moveUp = () => {
    this.props.moveUp(this.props.id);
  }

  render() {
    return (
      <React.Fragment>
        <tr style={{backgroundColor: this.props.turnOwner ? 'blue' : 'white'}}>
          <td>
            <button onClick={this.deleteRow} ><span className="material-icons">face</span> </button>
            <button onClick={this.moveUp}> <span></span> </button>
            <button onClick={this.moveDown}> <span></span> </button>
          </td>
          <td>
            <input name="name" value={this.props.name} onChange={this.handleInputChange}/>
          </td>
          <td >
            <input name="initiative" value={this.props.initiative} onChange={this.handleInputChange}/>
          </td>
          <td>
            <input name="hp" value={this.props.hp} onChange={this.handleInputChange}/>
          </td>
          <td>
            <input name="ac" value={this.props.ac} onChange={this.handleInputChange}/>
          </td>
          <td>
            <input name="cmb" value={this.props.cmb} onChange={this.handleInputChange}/>
          </td>
          <td>
            <input name="cmd" value={this.props.cmd} onChange={this.handleInputChange}/>
          </td>
          <td>
            <input name="notes" value={this.props.notes} onChange={this.handleInputChange}/>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}