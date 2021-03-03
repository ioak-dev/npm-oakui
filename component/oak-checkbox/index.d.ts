import { LitElement } from 'lit-element';
export declare class OakCheckbox extends LitElement {
    private elementId;
    value: boolean;
    name: string;
    color?: 'primary' | 'secondary' | 'tertiary' | 'default' | 'danger' | 'warning' | 'success' | 'info';
    size?: 'xsmall' | 'small' | 'medium' | 'large';
    /**
     * 	If true, the element will have a bottom margin.
     */
    gutterBottom?: boolean;
    checkboxGroupName?: string | null | undefined;
    constructor();
    connectedCallback(): void;
    private init;
    private _handleChange;
    private propagateEvent;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map