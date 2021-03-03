import { LitElement } from 'lit-element';
import '../../_internal/component/oak-internal-label';
import '../../_internal/component/oak-internal-form-tooltip';
import '../../_internal/component/oak-internal-form-error';
export declare class OakRadioGroup extends LitElement {
    private elementId;
    name: string;
    value: string;
    tooltip?: string;
    label?: string;
    /**
     * 	If true, the element will have a bottom margin.
     */
    gutterBottom?: boolean;
    radioGroupName: string;
    formGroupName?: string;
    /**
     * Validators
     *
     */
    validatorFunction?: Function;
    /**
     * @private
     */
    private _errors;
    constructor();
    connectedCallback(): void;
    private radioInit;
    private formControlInit;
    private _validate;
    private _handleChange;
    private propagateEvent;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map