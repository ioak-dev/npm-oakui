import { LitElement } from 'lit-element';
import '../../_internal/component/oak-internal-label';
import '../../_internal/component/oak-internal-form-tooltip';
import '../../_internal/component/oak-internal-form-error';
export declare class OakCheckboxGroup extends LitElement {
    private elementId;
    name: string;
    tooltip?: string;
    label?: string;
    /**
     * 	If true, the element will have a bottom margin.
     */
    gutterBottom?: boolean;
    checkboxGroupName: string;
    formGroupName?: string;
    /**
     * Validators
     *
     */
    validatorFunction?: Function;
    /**
     * min: Validates that atleast n number of checkboxes are chosen.
     */
    min?: number | null;
    /**
     * max: Validates that atmost n number of checkboxes are chosen.
     */
    max?: number | null;
    /**
     * @private
     */
    private _errors;
    private checkboxList;
    constructor();
    connectedCallback(): void;
    private checkboxInit;
    private formControlInit;
    private _validate;
    private _getValue;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map