// reason this is so slow is because we're dealing with arrays (.shift() is O(n))
// time complexity issue

interface IDict {
    ultimate: number;
    penultimate?: number;
}

const solveGame2 = (seedArray: number[], targetTurn: number) => {
    const dict: Record<number, IDict> = {};
    
    seedArray.forEach((num, index) => {
        const ultimate = 'ultimate';
        const penultimate = 'penultimate';
        if (dict[num]) {
            dict[num][penultimate] = dict[num][ultimate];
            dict[num][ultimate] = index + 1;
        } else {
            dict[num] = { ultimate: index + 1 }
        }
    }) 

    let turn = seedArray.length + 1;
    let mostRecentlySpokenNumber = seedArray[seedArray.length - 1];
    while (turn <= targetTurn) {
        if (!dict[mostRecentlySpokenNumber].penultimate) {
            mostRecentlySpokenNumber = 0;
        } else {
            const { penultimate, ultimate } = dict[mostRecentlySpokenNumber]
            mostRecentlySpokenNumber = ultimate - penultimate;
        }

        if (!dict[mostRecentlySpokenNumber]) {
            dict[mostRecentlySpokenNumber] = { ultimate: turn };
        } else {
            const { ultimate } = dict[mostRecentlySpokenNumber]
            dict[mostRecentlySpokenNumber].penultimate = ultimate;
            dict[mostRecentlySpokenNumber].ultimate = turn;
        }
        turn++;
    }
    return mostRecentlySpokenNumber;
}

// what we know is the second number in the tuple at dict[mostRecentlySaidNumber] is the previous turn
// if space complexity issue with creating new object for each seen number, perhaps try using just one number
// mapped to each key 

const solveGame3 = (seedArray: number[], targetTurn: number) => {
    const dict: Record<number, number> = {};

    seedArray.forEach((num, index) => {
        // for our purposes, the FIRST turn a number appears will be stored as negative
        dict[num] = (index + 1) * -1;
    })

    let turn = seedArray.length + 1;
    let mostRecentlySpokenNumber = seedArray[seedArray.length - 1];
    
    while (turn <= targetTurn) {
        // if mapped value is negative, that's the first time it was spoken
        if (dict[mostRecentlySpokenNumber] < 0) {
            // now set value to be positive, designating this is not the first time spoken
            dict[mostRecentlySpokenNumber] = dict[mostRecentlySpokenNumber] * -1;
            mostRecentlySpokenNumber = 0;
        } else {
            // last turn - penultimate turn spoken
            const newNumToBeSpoken = turn - 1 - dict[mostRecentlySpokenNumber];
            if (dict[newNumToBeSpoken] < 1) {
                dict[newNumToBeSpoken] = dict[newNumToBeSpoken] * -1;
            }
            // record last turn as ultimate value for mostRecentlySpokenNumber
            dict[mostRecentlySpokenNumber] = turn - 1;
            mostRecentlySpokenNumber = newNumToBeSpoken;
        }
        // if return doesn't exist in dict, map to negative at turn number
        if (!dict[mostRecentlySpokenNumber]) {
            dict[mostRecentlySpokenNumber] = turn * -1;
        }
        turn++;
    }

    return mostRecentlySpokenNumber;
}