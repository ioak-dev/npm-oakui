import { LitElement } from 'lit-element';
export declare class OakSheet extends LitElement {
    private elementId;
    position?: 'left' | 'right' | 'middle' | 'top' | 'bottom';
    isOpen: boolean;
    outlined?: boolean;
    fillColor?: 'global' | 'container' | 'surface' | 'float' | 'primary' | 'secondary' | 'tertiary' | 'default' | 'danger' | 'warning' | 'success' | 'info' | 'invert';
    sizeHorizontal?: 'one-third' | 'two-third' | 'half' | 'full' | 'auto';
    sizeVertical?: 'one-third' | 'two-third' | 'half' | 'full' | 'auto';
    paddingHorizontal?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    paddingVertical?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    backdropIntensity?: 0 | 1 | 2 | 3 | 4 | 5;
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
    private _isOpen;
    constructor();
    firstUpdated(_changedProperties: any): void;
    shouldUpdate(_changedProperties: Map<string | number | symbol, unknown>): boolean;
    private _handleClose;
    private propagateEvent;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map