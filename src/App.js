import React, { Component } from 'react';

import styled from 'styled-components';

import Network from './logic/Network';
import PlaneClass from './models/PlaneClass';

import Section from './components/Section';

const Content = styled.div`
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classLevels: [], // array of all class levels found, e.g. 3 here, could have 4th like Economy Plus
      selectedSeat: null, // set on whole page since only 1 selectedSeat per page
    }

    this.updateSelectedSeat = this.updateSelectedSeat.bind(this); // lets us set the state when calling the function
  }

  // promise to get the json data
  componentDidMount() {
    Network.getSeats()
    .then((response) => {
      this.sortSeats(response); // if data given, call sortSeats function
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // called when an available seat is selected to redraw the new/old selected seats
  updateSelectedSeat(row, seat) {
    this.setState({
      selectedSeat: {
        row,
        seat,
      }
    })
  }

  // need to sort the list of seats
  sortSeats(seatArray) {
    const sortedClasses = []; // end result with classes in order from front to back
    const seatClasses = {}; // list of classes starts in whatever order seats are provided, not necessarily front to back

    // first it sorts by the class e.g. first, business, economy
    for(let i = 0; i < seatArray.length; i += 1) {
      const seat = seatArray[i];

      // if we haven't seen this seat's class yet create an object/map
      // to hold seats for this section
      // so there will be x number of arrays within the seat array,
      // depending on how many class there are
      if(!seatClasses[seat.class]) {
        seatClasses[seat.class] = new PlaneClass();
      }

      // add this seat to the new or existing PlaneClass array
      const existingSeats = seatClasses[seat.class];
      existingSeats.addSeat(seat);
    }

    // key is the class name that was created for each unique class
    // e.g. economy, first, business
    // found in seatClasses
    for(let key in seatClasses) {
      const currentClass = seatClasses[key];
      currentClass.sortSeats(); // sort class section based on row and seat letter
      sortedClasses.push(currentClass); // then add when finished to list of classes
    } 
    // then sort the different classes based on their highest row to
    // put them in proper front -> back order
    sortedClasses.sort((a,b) => {
      return a.getHighestRow() - b.getHighestRow();
    })

    // now that the sort is over we can draw the screen
    this.setState({
      classLevels: sortedClasses,
    })
  }

  // accessing the sorted classes and drawing by section
  render() {
    let sections = [];
    for(let i = 0; i < this.state.classLevels.length; i += 1) {
      sections.push(
        <Section 
          key={i} 
          data={this.state.classLevels[i]}
          selectSeat={this.updateSelectedSeat}
          selectedSeat={this.state.selectedSeat}
        />
      );
    }

    return (
      <Content className="App">
        {sections}
      </Content>
    );
  }
}

export default App;
