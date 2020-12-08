import { parseBagRules, IBagRules } from './helper';

const getBagColorCount = (targetColor: string, rules: IBagRules): number => {
    let targetBagColorCount = 0;
    let seenColorsResults = {};

    const containsTargetChecker = createTargetChecker(seenColorsResults);

    Object.keys(rules).forEach(color => {
        const containsTargetColor = containsTargetChecker(color, targetColor, rules);
        if (containsTargetColor) {
            targetBagColorCount++;
        }
    })
    return targetBagColorCount;
};

const createTargetChecker = (seenColorResults: Record<string, boolean>) => {
    const checkIfContainsTarget = (color: string, targetColor: string, rules: IBagRules): boolean => {
        if (seenColorResults[color]) {
            return seenColorResults[color];
        }

        let containedBagColors = [];
        containedBagColors = Object.keys(rules[color]);
        if (containedBagColors.length === 0) {
            seenColorResults[color] = false;
            return false;
        }

        let containedColorResults = [];
        for (let containedColor of containedBagColors) {
            if (containedColor === targetColor) {
                seenColorResults[color] = true;
                return true;
            } else {
                const containedColorResult = checkIfContainsTarget(containedColor, targetColor, rules);
                containedColorResults.push(containedColorResult);
            }
        }

        return containedColorResults.includes(true);

        }
        return checkIfContainsTarget;
}

const result = getBagColorCount('shiny gold', parseBagRules('input'));

console.log(result)