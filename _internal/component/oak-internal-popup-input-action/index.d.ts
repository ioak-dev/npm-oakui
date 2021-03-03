import { LitElement } from 'lit-element';
import { ValidationErrorType } from '../../../types/ValidationResultType';
import '../oak-internal-label';
import '../oak-internal-form-tooltip';
import '../oak-internal-form-error';
import '../../../component/oak-button';
import '../../../component/oak-input';
/**
 * Select drop down (native) form element.
 *
 */
export declare class OakInternalPopupInputAction extends LitElement {
    private elementId;
    value?: string | number | null;
    placeholder?: string;
    tooltip?: string;
    name: string;
    disabled: boolean;
    options: any[];
    optionsAsKeyValue?: {
        key: string | number;
        value: string | number;
    }[] | null;
    errors: ValidationErrorType[];
    scrollableContainers: string[];
    size?: 'xsmall' | 'small' | 'medium' | 'large';
    shape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf';
    fill?: 'container' | 'surface' | 'float' | 'none';
    /**
     * Validators
     *
     */
    /**
     * @private
     */
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _registerEvents;
    private _unregisterEvents;
    private getClassMap;
    private handleInputFocused;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    private propagateCustomEvent;
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map