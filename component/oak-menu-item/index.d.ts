import { LitElement } from 'lit-element';
import '../../_internal/component/oak-internal-popup';
/**
 * Select drop down (native) form element.
 *
 */
export declare class OakMenuItem extends LitElement {
    private elementId;
    fill?: 'container' | 'surface' | 'float' | 'none';
    name: string;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleClick;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    private propagateCustomEvent;
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map