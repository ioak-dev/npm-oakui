const BASE_CLASS_NAME = 'oak-table-extern';
export function compose(props) {
    let output = BASE_CLASS_NAME;
    if (props.dense) {
        output += ` ${BASE_CLASS_NAME}--dense`;
    }
    output += ` ${BASE_CLASS_NAME}--fill-${props.fill || 'surface'}`;
    if (props.elevation === 0 && props.variant !== 'outlined') {
        output += ` ${BASE_CLASS_NAME}--orphan`;
    }
    return output;
}
//# sourceMappingURL=OakTableComposer.js.map