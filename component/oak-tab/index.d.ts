import { LitElement } from 'lit-element';
import '../oak-menu';
import '../oak-menu-item';
export declare class OakTab extends LitElement {
    private elementId;
    private headerElementId;
    private overflowMenuElementId;
    tabs: string[];
    activeTabIndex: number;
    color?: 'primary' | 'secondary' | 'tertiary' | 'default' | 'danger' | 'warning' | 'success' | 'invert' | 'info';
    variant?: 'underline' | 'accent' | 'fill' | 'text' | 'pills';
    rounded?: boolean | undefined;
    fill?: boolean | undefined;
    nobaseline?: boolean | undefined;
    private _hiddenTabIndexes;
    private _debounceTimeout;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(_changedProperties: any): void;
    private _registerEvents;
    private _unregisterEvents;
    private _adjustPositioning;
    private _doAdjustPositioning;
    private handleClick;
    private propagateEvent;
    private _renderTab;
    private _renderOverflowMenu;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map