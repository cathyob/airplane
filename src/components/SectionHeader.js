import React, { Component } from 'react';

import styled from 'styled-components';

// for the seat letter labels at the top of each section
const SeatsHeader = styled.div`
    background: none;
    border: 0;
    box-sizing: border-box;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    margin: 3px 3px;
    padding: 0;
    transition: .3s;
    width: 20px;
`;

export default class SectionHeader extends Component {

    createHeaders() {
        const seatHeaders = [];
        for(let i = 0; i < this.props.data.length; i += 1) {
            seatHeaders.push(
                <SeatsHeader key={i}>{this.props.data[i].seat}</SeatsHeader>
            )
        }

        return seatHeaders;
    }

    render() {
        return this.createHeaders();
    }
}