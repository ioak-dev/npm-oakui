import { ValidatorType } from './ValidatorType';
export const CheckedCountValidator = (value, min, max) => {
    const outcome = [];
    if (min && max && (value.length < min || value.length > max)) {
        outcome.push({
            type: ValidatorType.CHECKED_COUNT_LENGTH,
            expected: `${min}-${max}`,
            actual: value.length,
        });
    }
    else if (min && value.length < min) {
        outcome.push({
            type: ValidatorType.MIN_CHECKED_COUNT_LENGTH,
            expected: min,
            actual: value.length,
        });
    }
    else if (max && value.length > max) {
        outcome.push({
            type: ValidatorType.MAX_CHECKED_COUNT_LENGTH,
            expected: max,
            actual: value.length,
        });
    }
    return outcome;
};
//# sourceMappingURL=CheckedCountValidator.js.map