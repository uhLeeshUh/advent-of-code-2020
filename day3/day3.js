const fs = require("fs").promises;

const readLines = async () => {
    const data = await fs.readFile('./input', {encoding: 'utf-8'});
    return data.split('\n');
}

// Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?

// .....#............#....#####.##
// .#.#....#......#....##.........
// ......#.#.#.....###.#.#........
// ......#...#.....#####....#..##.
// ...#............##...###.##....
// #.....#...#....#......##....##.
// #...#.#....#..#..##.##...#.....
// .......#..........#..#..#.#....
// .#.....#.#.......#..#...#....#.
// #..#.##.#..................###.
// ...#.#.##...##.###.....#..#...#

const testLines = 
["..##.......",
"#...#...#..",
".#....#..#.",
"..#.#...#.#",
".#...##..#.",
"..#.##.....",
".#.#.#....#",
".#........#",
"#.##...#...",
"#...##....#",
".#..#...#.#"];

const findHowManyHitTrees = (lines, rightMove, downMove) => {
    const gridLength = lines[0].length;
    const gridHeight = lines.length;

    let numOfHitTrees = 0;
    let currRowIndex = 0;
    let currColumnIndex = 0;

    while (currRowIndex < gridHeight - downMove) {
        let newColumnIndex = currColumnIndex + rightMove;
        if (newColumnIndex > gridLength - 1) {
            newColumnIndex = newColumnIndex % gridLength;
        }
        const newRowIndex = currRowIndex + downMove;

        if (lines[newRowIndex][newColumnIndex] === '#') {
            numOfHitTrees++;
        }
        currRowIndex = newRowIndex;
        currColumnIndex = newColumnIndex;
    }
    return numOfHitTrees;
}

const solve = async () => {
    const lines = await readLines();

    const first = findHowManyHitTrees(lines, 1, 1);
    const second = findHowManyHitTrees(lines, 3, 1);
    const third = findHowManyHitTrees(lines, 5, 1);
    const fourth = findHowManyHitTrees(lines, 7, 1);
    const fifth = findHowManyHitTrees(lines, 1, 2);

    return first * second * third * fourth * fifth;
}

solve().then(res => console.log(res));
// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.
// In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

// What do you get if you multiply together thse number of trees encountered on each of the listed slopes?

// const solve = async () => {
//     const lines = await readLines();
//     return findHowManyHitTrees(lines, 3, 1);
// }

// solve().then(res => console.log(res))

// I don't think I need to iterate. I should be able to keep track of the coordinates I'm at (row and column)
// When row > array.length, then we can stop
// When column > string than length of row, we'll want to mod by string length to re-assign column coordinate
// Keep a counter variable for number of trees encountered