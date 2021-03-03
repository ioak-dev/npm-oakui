import { LitElement } from 'lit-element';
import { ValidationErrorType } from '../../../types/ValidationResultType';
import '../oak-internal-label';
import '../oak-internal-form-tooltip';
import '../oak-internal-form-error';
import '../oak-internal-popup-input-action';
import '../../../component/oak-input';
import '../../../component/oak-button';
/**
 * Select drop down (native) form element.
 *
 */
export declare class OakSelect extends LitElement {
    private elementId;
    private actionElementId;
    private popupElementId;
    isActivated: boolean;
    parentElementIds?: string[];
    label?: string | null;
    value?: string | number | null;
    placeholder?: string;
    multiple?: boolean;
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
    type?: 'input' | 'custom';
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
    shouldUpdate(_changedProperties: Map<string | number | symbol, unknown>): boolean;
    private _registerEvents;
    private _unregisterEvents;
    private clickEventHandler;
    private keydownEventHandler;
    private _activate;
    private _handlePostActivate;
    private _deactivate;
    private adjustPositioning;
    private getClassMap;
    private handleInputFocused;
    private _renderAction;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    private propagateCustomEvent;
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map