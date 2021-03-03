import { LitElement } from 'lit-element';
export declare class OakRadio extends LitElement {
    private elementId;
    name: string;
    color?: 'primary' | 'secondary' | 'tertiary' | 'default' | 'danger' | 'warning' | 'success' | 'info';
    size?: 'xsmall' | 'small' | 'medium' | 'large';
    /**
     * 	If true, the element will have a bottom margin.
     */
    gutterBottom?: boolean;
    radioGroupName: string;
    private _value;
    constructor();
    connectedCallback(): void;
    private init;
    private _handleChange;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map