import React from "react";

/******************************************************************************
* Class Clock *
* Displays minutes, seconds, and rounds that have elapsed.
******************************************************************************/
export default class Clock extends React.Component{
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