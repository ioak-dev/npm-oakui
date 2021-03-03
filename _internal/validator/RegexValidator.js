import { toString } from '../../_internal/utils/StringUtils';
import { ValidatorType } from './ValidatorType';
export const RegexValidator = (value, pattern) => {
    const outcome = [];
    const valueAsString = toString(value);
    if (!pattern.test(valueAsString)) {
        outcome.push({
            type: ValidatorType.TEXT_PATTERN,
            expected: pattern,
            actual: valueAsString,
        });
    }
    return outcome;
};
//# sourceMappingURL=RegexValidator.js.map