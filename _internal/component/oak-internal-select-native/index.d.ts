import { LitElement } from 'lit-element';
import '../oak-internal-label';
import '../oak-internal-form-tooltip';
import '../oak-internal-form-error';
/**
 * Select drop down (native) form element.
 *
 */
export declare class OakInternalSelectNative extends LitElement {
    private elementId;
    formGroupName?: string;
    label?: string | null | undefined;
    value?: string | number | null;
    placeholder?: string;
    multiple?: boolean;
    tooltip?: string;
    name: string;
    disabled: boolean;
    options?: any[] | null;
    optionsAsKeyValue?: {
        key: string | number;
        value: string | number;
    }[] | null;
    size?: 'xsmall' | 'small' | 'medium' | 'large';
    shape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf';
    fill?: 'container' | 'surface' | 'float' | 'none';
    /**
     * 	If true, the text will have a bottom margin.
     */
    gutterBottom?: boolean;
    /**
     * Validators
     *
     */
    /**
     * @private
     */
    private _errors;
    constructor();
    connectedCallback(): void;
    private init;
    private validate;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    private handleInput;
    private handleChange;
    private propagateEvent;
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map