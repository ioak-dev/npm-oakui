const BASE_CLASS_NAME = 'oak-typography';
export function compose(props) {
    let output = BASE_CLASS_NAME;
    output += ` ${BASE_CLASS_NAME}-root`;
    output += ` ${BASE_CLASS_NAME}-${props.variant}`;
    output += ` ${BASE_CLASS_NAME}-align-${props.align}`;
    output += ` ${BASE_CLASS_NAME}-display-${props.display}`;
    output += ` ${BASE_CLASS_NAME}-highlight-${props.highlightColor}`;
    if (props.paragraph) {
        output += ` ${BASE_CLASS_NAME}-paragraph`;
    }
    if (props.noWrap) {
        output += ` ${BASE_CLASS_NAME}-noWrap`;
    }
    if (props.gutterBottom) {
        output += ' oak-gutter-bottom';
    }
    if (props.color) {
        output += ` oak-color-fg-${props.color}`;
    }
    return output;
}
//# sourceMappingURL=OakTypographyComposer.js.map