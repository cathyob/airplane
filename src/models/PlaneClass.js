export default class PlaneClass {
    constructor() {
        this.seats = []; // to put all seats in a certain section into
    }

    addSeat(seat) {
        this.seats.push(seat);
    }

    // sort seats that are out of order by row then seat
    sortSeats() {
        this.seats.sort((seat1, seat2) => {
            if(seat1.row !== seat2.row) {
                return seat1.row - seat2.row
            } else {
                return seat1.seat.localeCompare(seat2.seat, "en-US"); // comparing in english always
                // e.g. compare seat1.c to seat2.a, a comes before c in english
            }
        })
    }

    // given a row number of 1 or higher, not 0
    getSeatsForRow(rowNumber) {
        const firstSeat = this.seats[0];

        // assuming there is at least 1 seat per row 
        let seatsInRow = 1;

        // if a row has 2 or more seats
        // need to compare to seats ahead until row number changes
        // then we know that is how wide the row is, assuming all
        // rows in the section have the same number of seats
        for(let i = 1; i < this.seats.length; i += 1) {
            // set the next seat starting at the 2nd seat in a row
            const nextSeat = this.seats[i];

            // if we find the next row's first seat we know i is the
            // number of seats in the row
            if(firstSeat.row !== nextSeat.row) {
                seatsInRow = i;
                break // once we see it change we can stop the loop since all rows are the same
            }
        }

        //  used to calculate what row is asked for, subtracting 1 to find the index
        // if we know the row number we know the first seat
        // since e.g. row 4 - 1 = 3 * 4 = 12, the first seat in row 4 is at index 12
        const firstSeatIndex = (rowNumber - 1) * seatsInRow;

        let rowOfSeats = [];

        // starting at the first seat of the row given
        // to the end of the row knowing how many seats per row
        // so we can draw the full section
        for(let i = firstSeatIndex; i < firstSeatIndex + seatsInRow; i += 1) {
            const seat = this.seats[i];
            rowOfSeats.push(seat);
        }
        
        // so that we can use this to find the aisles
        // and keeping the row numbers true to the full plane, not by section
        return this.findAisles(rowOfSeats, firstSeat.row+(rowNumber - 1));
    }

    findAisles(seatsInRow, rowNumber) {
        // representing the first seat's letter as a number so that
        // we can calc how many seats + aisles are in a row
        const startingLetterCode = 'A'.charCodeAt(0);

        // based on assigment details assume last seat in array is
        // the same in all rows in that section
        // and will use to calc seats + aisles
        const lastLetterCode = seatsInRow[seatsInRow.length - 1].seat.charCodeAt(0);

        // using the last letter's code to subtract the starting letter's
        // code to calc seats + aisles in the row
        const distance = lastLetterCode - startingLetterCode;

        const rowWithAisles = [];

        // using advanced so we don't skip after we find a missing seat
        let advanced = 0;

        for(let i = 0; i <= distance; i++) {
            // convert number to a character/string starting 
            // at first character i.e. A
            const currChar = String.fromCharCode(startingLetterCode + i); 
        
            // if the current seat doesn't match the character's code
            // we know an aisle exists
            if(seatsInRow[advanced].seat !== currChar) {
                // so we add the aisle as an object with a row number
                rowWithAisles.push({row: rowNumber});
            } else {
                // if the seat matches the character's code we add to the
                // array confirming the match then move forward to compare the next
                rowWithAisles.push(seatsInRow[advanced]);
                advanced += 1;
            }
        }
        return rowWithAisles;
    }

    // based on assignment details, assuming rows in one class are
    // symmetrical & the same length
    getHighestRow() {
        return this.seats[this.seats.length - 1].row;
    }

    // for drawing seating chart count number of rows in the class
    // add one since starting at row 1
    getRowCount() {
        return (this.getHighestRow() - this.seats[0].row) + 1;
    }

    // using to determine how many seats + aisles are in a row
    // to feed into the section component to set the widths of each section
    getRowWidth() {
        const startingSeat = 'A'.charCodeAt(0) - 1;
        const highestSeat = this.seats[this.seats.length - 1].seat.charCodeAt(0);

        return highestSeat - startingSeat;
    }

    // grab the class level to use as section title / className / whatever may be needed
    getClassLevel() {
        return this.seats[0].class;
    }
}