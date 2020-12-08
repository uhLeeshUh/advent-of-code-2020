import { parseBagRules, IBagRules } from './helper';

const getInternalCountForBagColor = (color: string, rules: IBagRules, seenColorResults = {}): number => {
    if (seenColorResults[color]) {
        return seenColorResults[color];
    }

    let containedBagColors = [];
    containedBagColors = Object.keys(rules[color]);
    if (containedBagColors.length === 0) {
        seenColorResults[color] = 0;
        return 0;
    }

    let containedColorBagCountSum = 0;
    for (let containedColor of containedBagColors) {
        const numOfBags = Number(rules[color][containedColor]);
        let containedColorBagCount = getInternalCountForBagColor(containedColor, rules);
        containedColorBagCountSum += numOfBags + (containedColorBagCount * numOfBags);
    }

    return containedColorBagCountSum;
}


const result = getInternalCountForBagColor('shiny gold', parseBagRules('input'));

console.log(result)