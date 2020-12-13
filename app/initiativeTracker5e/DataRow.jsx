import React from 'react';
import PropTypes from 'prop-types';

/******************************************************************************
* Class DataRow *
* Data for a single row. Allows editing stats, and row selection.
******************************************************************************/
export default class DataRow extends React.Component {
  constructor(props){
    super(props);
  }

  /**
   * Handles the change event on the inputs and updates the appropriate state value.
   */
  handleInputChange = () => {
    this.props.handleInputChange(this.props.id, event);
  }

  /**
   * Handles setting the selected id on the parent.
   */
  setSelectedID = () => {
    this.props.setSelectedID(this.props.id);
  }  

  render() {
    return (
      <React.Fragment>
        <tr style={{backgroundColor: this.props.turnOwner ? 'blue' : 'white'}}>
          <td>
            <button style={{color: this.props.selected ? 'green' : 'black'}} onClick={this.setSelectedID} ><span className="material-icons">face</span></button>
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
            <input name="dex" value={this.props.dex} onChange={this.handleInputChange}/>
          </td>
          <td>
            <input name="notes" value={this.props.notes} onChange={this.handleInputChange}/>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

DataRow.propTypes = {
  ac:                PropTypes.number,
  dex:               PropTypes.number,
  handleInputChange: PropTypes.func,
  hp:                PropTypes.number,
  id:                PropTypes.number,
  initiative:        PropTypes.number,
  name:              PropTypes.string,
  notes:             PropTypes.string,
  selected:          PropTypes.bool,
  setSelectedID:     PropTypes.func,
  turnOwner:         PropTypes.bool
}
