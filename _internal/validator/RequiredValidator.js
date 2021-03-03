import { isEmptyOrSpaces, toString } from '../../_internal/utils/StringUtils';
import { ValidatorType } from './ValidatorType';
export const RequiredValidator = (value) => {
    const outcome = [];
    console.log('****', value, isEmptyOrSpaces(toString(value)));
    if (isEmptyOrSpaces(toString(value))) {
        outcome.push({
            type: ValidatorType.REQUIRED,
            expected: 'required',
            actual: 'empty',
        });
    }
    return outcome;
};
//# sourceMappingURL=RequiredValidator.js.map