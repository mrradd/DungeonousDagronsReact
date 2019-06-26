import React from 'react';

/******************************************************************************
* Class DataTable *
* Puts together the table of character data.
******************************************************************************/
export default class DataTable extends React.Component {
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
          <td key={idCounter++} id={idCounter}><input value={data[i].cmb}/></td>
          <td key={idCounter++} id={idCounter}><input value={data[i].cmd}/></td>
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