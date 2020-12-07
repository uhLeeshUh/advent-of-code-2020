// For example, suppose you have the following list:

// 1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc
// Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

// In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

// How many passwords are valid according to their policies?

// [
//     [ [ 15, 19 ], 'k', 'kkkkkkkkkkkkzkkkkkkk' ],
//     [ [ 1, 11 ], 's', 'sbssswsqsssssrlss' ],
//     [ [ 8, 9 ], 'b', 'pbbbbbbkbz' ],
//     [ [ 4, 10 ], 'w', 'wwccwcqwdmbktjrxhw' ],
//     [ [ 1, 6 ], 'x', 'jvscgqsnt' ],
// ]  

const { parsedPuzzleInput } = require('./day2input');

const countCorrectPasswords = (passwordsArr) => {
    let countCorrect = 0;

    passwordsArr.forEach(pass => {
        const range = pass[0]
        const targetLetter = pass[1]
        const passwordText = pass[2]

        let localLetterCount = 0;
        for (let char of passwordText) {
            if (char === targetLetter) {
                localLetterCount++;
            }
        }

        if (localLetterCount >= range[0] && localLetterCount <= range[1]) {
            countCorrect++;
        }
    })

    return countCorrect;
};

console.log(countCorrectPasswords(parsedPuzzleInput));
