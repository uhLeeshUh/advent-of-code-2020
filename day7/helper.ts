import { readFileSync } from 'fs';

export type IBagRules = Record<string, Record<string, string>>

export const parseBagRules = (dataSourceFile: string): IBagRules => {
    let rulesString = readFileSync(`./${dataSourceFile}`, { encoding: 'utf-8' });
    // exclude final period
    rulesString = rulesString.slice(0, rulesString.length - 1);
    const rulesLines = rulesString.split('.\n');
    const bagRules = {};
    rulesLines.forEach(line => {
        const subArrayWithBase = line.split(' bags contain ');
        const subArrayChildren = subArrayWithBase[1]?.split(", ")
        const cleanedSubArrayChildren = subArrayChildren.map(str => { 
            const noBagString = str.replace(/ (bag)(s?)/,"") 
            // https://www.regular-expressions.info/lookaround.html#bodytext:~:text=Positive%20and%20Negative%20Lookbehind
            return noBagString.split(/(?<=\d) /);
        })

        const containingBags = {};
        cleanedSubArrayChildren.forEach(childSubArr => {
            if (childSubArr.length === 2) {
                containingBags[childSubArr[1]] = childSubArr[0];
            }
        })
        bagRules[subArrayWithBase[0]] = containingBags;
    });
    return bagRules;
}
