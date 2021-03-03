import { LitElement } from 'lit-element';
export declare class OakAppLayout extends LitElement {
    private elementId;
    private topbarElementId;
    private leftDrawerElementId;
    private rightDrawerElementId;
    private contentElementId;
    topbarVariant: 'sticky' | 'static' | 'auto';
    leftDrawerOpen: boolean;
    rightDrawerOpen: boolean;
    leftDrawerType: 'side' | 'over' | 'push';
    rightDrawerType: 'side' | 'over' | 'push';
    topbarColor: 'global' | 'container' | 'surface' | 'float' | 'primary' | 'secondary' | 'tertiary' | 'default' | 'danger' | 'warning' | 'success' | 'info' | 'invert' | 'custom';
    topElevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
    leftElevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
    rightElevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
    constructor();
    firstUpdated(_changedProperties: any): void;
    shouldUpdate(_changedProperties: Map<string | number | symbol, unknown>): boolean;
    private _recomputeDimensions;
    private _handleClose;
    private propagateEvent;
    private _renderBackdrop;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map