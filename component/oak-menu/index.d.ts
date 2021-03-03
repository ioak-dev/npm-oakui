import { LitElement } from 'lit-element';
import '../../_internal/component/oak-internal-popup';
/**
 * Select drop down (native) form element.
 *
 */
export declare class OakMenu extends LitElement {
    private elementId;
    private inputElementId;
    private liElementId;
    private ulElementId;
    private _isActivated;
    private _currentIndex;
    options: any[];
    size?: 'xsmall' | 'small' | 'medium' | 'large';
    shape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf';
    fill?: 'container' | 'surface' | 'float' | 'none';
    /**
     * 	If true, the text will have a bottom margin.
     */
    gutterBottom?: boolean;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private keydownEventHandler;
    private navigateDown;
    private navigateUp;
    private isScrolledIntoView;
    private _activate;
    private _deactivate;
    private handleKeydown;
    private handleClick;
    private handleMenuClick;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map