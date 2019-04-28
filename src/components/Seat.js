import React, { Component } from 'react';

import styled from 'styled-components';

const Seat = styled.div`
    background: none;
    border: 2px solid DarkGray;
    box-sizing: border-box;
    border-radius: 3px;
    height: 20px;
    margin: 3px;
    transition: .3s;
    width: 20px;
    &.Available {
        background: royalblue;
        cursor: pointer;
        &:hover {
            background: pink;
        }
    }
    &.Selected, &.Selected:hover {
        background: magenta;
        cursor: default;
    }
    &.Aisle {
        background: none;
        border: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 3px 3px;
        padding: 0;
    }
`;

export default class SeatItem extends Component {
  constructor(props) {
    super(props);

    this.selectSeat = this.selectSeat.bind(this);
  }

  selectSeat() {
      if(this.props.onSelect && !this.props.data.occupied) {
          this.props.onSelect(this.props.data.row, this.props.data.seat);
      }
  }

  render() {
      const classNames = [];
      let rowNum = null;

      if (!this.props.data.seat) { // if it doesn't have a seat letter then we know it is an aisle
          classNames.push("Aisle");
          rowNum = this.props.data.row;
      } else if(!this.props.data.occupied) { // if it isn't marked as occupied: true set className to available
          classNames.push("Available");
      }

      // if we were given a selected seat and the row num and seat letter match add className Selected
      if(this.props.selectedSeat && 
        this.props.selectedSeat.row === this.props.data.row && 
        this.props.selectedSeat.seat === this.props.data.seat) {
             classNames.push("Selected");
      }
      
    return (
      // need to convert from array to string with spaces in-between
      <Seat className={classNames.join(" ")} onClick={this.selectSeat}>
        {rowNum !== null ? rowNum : null}
      </Seat>
    );
  }
}