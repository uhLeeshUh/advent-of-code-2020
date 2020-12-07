import { readFileSync } from 'fs';

// For example, consider just the first seven characters of FBFBBFFRLR:

// Start by considering the whole range, rows 0 through 127.
// F means to take the lower half, keeping rows 0 through 63.
// B means to take the upper half, keeping rows 32 through 63.
// F means to take the lower half, keeping rows 32 through 47.
// B means to take the upper half, keeping rows 40 through 47.
// B keeps rows 44 through 47.
// F keeps rows 44 through 45.
// The final F keeps the lower of the two, row 44.

// For example, consider just the last 3 characters of FBFBBFFRLR:

// Start by considering the whole range, columns 0 through 7.
// R means to take the upper half, keeping columns 4 through 7.
// L means to take the lower half, keeping columns 4 through 5.
// The final R keeps the upper of the two, column 5.
// So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.


// What is the highest seat ID on a boarding pass?

const findHighestSeatId = (boardingPasses: string[], totalRows: number, totalColumns: number) => {
    // I want to iterate over boardingPasses and keep track of highest seat id in a var
    let highestSeatId = 0;
    boardingPasses.forEach(boardingPass => {
        const seatId = getSeatId(boardingPass, totalRows, totalColumns);
        if (seatId > highestSeatId) {
            highestSeatId = seatId;
        }
    })
    return highestSeatId
}   

const getSeatId = (boardingPass: string, totalRows: number, totalColumns: number) => {
    const rowLetters = boardingPass.slice(0,7)
    const columnLetters = boardingPass.slice(7)

    let lowerBound = 0;
    let upperBound = totalRows - 1;

    for (let letter of rowLetters) {
        // split existing range in half. Midpoint included in first half
        const midPoint = (Math.floor((upperBound - lowerBound) / 2)) + lowerBound;
        if (letter === 'F'){
            upperBound = midPoint;
        } else {
            lowerBound = midPoint + 1;
        }
    }

    const rowNumber = lowerBound;
    lowerBound = 0;
    upperBound = totalColumns - 1;

    for (let letter of columnLetters) {
        // split existing range in half. Midpoint included in first half
        const midPoint = (Math.floor((upperBound - lowerBound) / 2)) + lowerBound;
        if (letter === 'L'){
            upperBound = midPoint;
        } else {
            lowerBound = midPoint + 1;
        }
    }

    const columnNumber = lowerBound;
    return (rowNumber * 8) + columnNumber;
}

const myBoardingPassesString = readFileSync('./input', { encoding: 'utf-8'});
const myBoardingPasses = myBoardingPassesString.split('\n');

const findMySeat = (...args: Parameters<typeof findHighestSeatId>) => {
    const [boardingPasses, totalRows, totalColumns] = args;
    // get seatId for each boarding pass and insert into array at index of seatId
    
    const seatsArray = [];
    boardingPasses.forEach(boardingPass => {
        const seatId = getSeatId(boardingPass, totalRows, totalColumns);
        seatsArray[seatId] = true;
    })

    // iterate to index that is undefined but defined at right and left
    for (let i = 0; i < seatsArray.length; i++) {
        if (!seatsArray[i] && seatsArray[i-1] && seatsArray[i + 1]) {
            return i;
        }
    }
    
}

console.log(findMySeat(myBoardingPasses, 128,8))