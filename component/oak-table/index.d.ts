import { LitElement } from 'lit-element';
import '../oak-paginate';
import { PaginatePref } from '../../types/PaginatePrefType';
export declare class OakTable extends LitElement {
    private elementId;
    id: string;
    /**
     * Applicable when serverSidePagination = true
     */
    totalRows: number;
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
    rounded?: boolean;
    variant?: 'outlined' | null;
    fill?: 'global' | 'container' | 'surface' | 'float' | 'none';
    navPlacement?: 'top' | 'bottom' | 'none';
    formElementSize?: 'xsmall' | 'small' | 'medium' | 'large';
    formElementShape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf';
    dense: boolean;
    paginatePref: PaginatePref;
    constructor();
    private _onPageChange;
    shouldUpdate(_changedProperties: Map<string | number | symbol, unknown>): boolean;
    private _propagateEvent;
    private _renderPaginateSection;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map