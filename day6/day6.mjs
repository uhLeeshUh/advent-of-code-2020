import fs from 'fs';

const input = fs.readFileSync('./input', { encoding: 'utf-8'} );
const delimitedInput = input.split("\n\n");
const cleanedInput = delimitedInput.map(str => str.replace(/\n/g,""));

const sumGroupTotals = (input) => {
    let sumCounts = 0;
    input.forEach(str => {
        // iterate through each letter and keep a tally of how many we've seen
        let groupMap = {};
        for (let char of str) {
            if (groupMap[char]) {
                groupMap[char] = groupMap[char] + 1;
            } else {
                groupMap[char] = 1
            }
        }
    
        const localSumCount = Object.keys(groupMap).length;
        sumCounts = sumCounts + localSumCount;
    });

    return sumCounts;
}

// part 2

// You don't need to identify the questions to which anyone answered "yes"; 
// you need to identify the questions to which everyone answered "yes"!

const input = fs.readFileSync('./input', { encoding: 'utf-8'} );
const delimitedInput = input.split("\n\n");
const groupedInput = delimitedInput.map(str => str.split("\n"));

// now, I still will iterate over every sub array
// each subarr wil now have a groupMap with key of letter and value of set
// vals to the set will be the index of the string in the subarray
// before moving on to the next subarray, we count the number of letters for which the 
// value set has set.size equal to length of subarray

const sumGroupTotals2 = (input) => {
    let sumAllYesAnswersGroupCount = 0;
    input.forEach(subArray => {
        const groupMemberCount = subArray.length;
        const groupMap = {};
        subArray.forEach((groupStr, strIndex) => {
            for (let char of groupStr) {
                if (groupMap[char]) {
                    groupMap[char].add(strIndex);
                } else {
                    groupMap[char] = new Set();
                    groupMap[char].add(strIndex);
                }
            }
        })
        let localAllYesAnswersGroupCount = 0;
        Object.values(groupMap).forEach(letterSet => {
            if (letterSet.size === groupMemberCount) {
                localAllYesAnswersGroupCount++;
            }
        })
        sumAllYesAnswersGroupCount += localAllYesAnswersGroupCount;
    })
    return sumAllYesAnswersGroupCount;
}

console.log(sumGroupTotals2(groupedInput))