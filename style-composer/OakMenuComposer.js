const BASE_CLASS_NAME = 'oak-menu-extern';
export function compose(props) {
    let output = BASE_CLASS_NAME;
    output += ` ${BASE_CLASS_NAME}--${props.variant || 'list'}`;
    return output;
}
//# sourceMappingURL=OakMenuComposer.js.map