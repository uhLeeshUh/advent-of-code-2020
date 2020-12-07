// Given the same example list from above:

// 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
// 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
// 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

// [
//     [ [ 15, 19 ], 'k', 'kkkkkkkkkkkkzkkkkkkk' ],
//     [ [ 1, 11 ], 's', 'sbssswsqsssssrlss' ],
//     [ [ 8, 9 ], 'b', 'pbbbbbbkbz' ],
//     [ [ 4, 10 ], 'w', 'wwccwcqwdmbktjrxhw' ],
//     [ [ 1, 6 ], 'x', 'jvscgqsnt' ],
// ] 

// How many passwords are valid according to the new interpretation of the policies?

const { parsedPuzzleInput } = require('./day2input');

const countCorrectPasswords = (passwordsArr) => {
    let countCorrect = 0;

    passwordsArr.forEach(pass => {
        const [firstIndex, secondIndex] = pass[0]
        const targetLetter = pass[1]
        const passwordText = pass[2]

        const isFirstIndexMatch = passwordText[firstIndex - 1] === targetLetter;
        const isSecondIndexMatch = passwordText[secondIndex - 1] === targetLetter;

        if (isFirstIndexMatch && !isSecondIndexMatch) {
            countCorrect++;
        } else if (!isFirstIndexMatch && isSecondIndexMatch) {
            countCorrect++;
        }
    })

    return countCorrect;
}

// const test = [
//     [ [ 1, 3 ], 'a', 'abcde' ], 
//     [ [ 1, 11 ], 's', 'sbssswsqsssssrlss' ], 
//     [ [ 8, 9 ], 'b', 'pbbbbbbkbz' ],
//     [ [ 4, 10 ], 'w', 'wwccwcqwdmbktjrxhw' ], 
//     [ [ 1, 6 ], 'x', 'xjxvscgqsnt' ],
// ];


console.log(countCorrectPasswords(parsedPuzzleInput));