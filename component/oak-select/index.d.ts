import { LitElement } from 'lit-element';
import '../../_internal/component/oak-internal-select-native';
import '../../_internal/component/oak-internal-select-modern';
/**
 * Select drop down (native) form element.
 *
 */
export declare class OakSelect extends LitElement {
    private elementId;
    id: string;
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
    native?: boolean | undefined;
    size?: 'xsmall' | 'small' | 'medium' | 'large';
    shape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf';
    fill?: 'container' | 'surface' | 'float' | 'none';
    /**
     * 	If true, the text will have a bottom margin.
     */
    gutterBottom?: boolean;
    constructor();
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map