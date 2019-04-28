import React, { Component } from 'react';

import styled from 'styled-components';

import Seat from '../components/Seat';
import SectionHeader from '../components/SectionHeader';

const SectionOfSeats = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 32px auto;
    width: calc(27px * ${props => props.rowWidth});
    h3 {
        flex: 100%;
        text-align: center;
    }
`;

export default class Section extends Component {

    getSeatsToDraw() {
        let seatsToDraw = [];

        for(let z = 0; z < this.props.data.getRowCount(); z += 1) {
            // need to start z at 1 since an index of 0 is row 1
            const seatsWithAisles = this.props.data.getSeatsForRow(z + 1);

            for(let i = 0; i < seatsWithAisles.length; i += 1) {
                /* key: since there are multiple sections need to ensure each key is unique by section and seat */
                seatsToDraw.push(
                    <Seat 
                        key={z + " " + i} 
                        data={seatsWithAisles[i]}
                        onSelect={this.props.selectSeat}
                        selectedSeat={this.props.selectedSeat}
                    />
                )
            }
        }

        return seatsToDraw;
    }

    render() {
        return (
        <SectionOfSeats 
            className={this.props.data.getClassLevel()} 
            rowWidth={this.props.data.getRowWidth()}>
            <h3>{this.props.data.getClassLevel()}</h3>
            <SectionHeader data={this.props.data.getSeatsForRow(1)} />
            {this.getSeatsToDraw()}
        </SectionOfSeats>
        );
    }
}