export interface OakTypographyProps {
    color?: 'inherit' | 'primary' | 'secondary' | 'tertiary' | 'default' | 'danger' | 'warning' | 'success' | 'invert' | 'info';
    highlightColor?: 'none' | 'primary' | 'secondary' | 'tertiary' | 'default' | 'danger' | 'warning' | 'success' | 'invert' | 'info';
    /**
     * Set the text-align on the component.
     */
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    /**
     * Controls the display type
     */
    display?: 'inherit' | 'initial' | 'inline' | 'block' | 'inline-block' | 'inline-flex';
    /**
     * If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.
     * Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow).
     */
    noWrap?: boolean;
    /**
     * If true, the text will have a bottom margin.
     */
    paragraph?: boolean;
    /**
     * 	If true, the text will have a bottom margin.
     */
    gutterBottom?: boolean;
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';
}
export declare function compose(props: OakTypographyProps): string;
//# sourceMappingURL=OakTypographyComposer.d.ts.map