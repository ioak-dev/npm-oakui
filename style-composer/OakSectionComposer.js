const BASE_CLASS_NAME = 'oak-section-extern';
export function compose(props) {
    let output = BASE_CLASS_NAME;
    output += ` oak-bs-elevation${props.elevation || 0}`;
    output += ` oak-padding-horizontal${props.paddingHorizontal || 2}`;
    output += ` oak-padding-vertical${props.paddingVertical || 2}`;
    output += ` ${BASE_CLASS_NAME}--outline-${props.outlineColor || 'none'}`;
    output += ` ${BASE_CLASS_NAME}--fill-${props.fillColor || 'container'}`;
    output += ` ${BASE_CLASS_NAME}--text-${props.textColor || 'auto'}`;
    if (props.semitransparent) {
        output += ` ${BASE_CLASS_NAME}--semitransparent`;
    }
    if (props.rounded) {
        output += ' oak-rounded';
    }
    if (props.gutterBottom) {
        output += ' oak-gutter-bottom';
    }
    if (props.fullWidth) {
        output += ` ${BASE_CLASS_NAME}--fullwidth`;
    }
    return output;
}
//# sourceMappingURL=OakSectionComposer.js.map