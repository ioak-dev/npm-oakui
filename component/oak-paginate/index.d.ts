import { LitElement } from 'lit-element';
import '../oak-select';
import '../../_internal/component/oak-internal-paginate-filter';
import { PaginatePref } from '../../types/PaginatePrefType';
export declare class OakPaginate extends LitElement {
    private elementId;
    totalRows: number;
    label: string;
    formElementSize?: 'xsmall' | 'small' | 'medium' | 'large';
    formElementShape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf';
    formElementFill?: 'container' | 'surface' | 'float' | 'none';
    private _rowsPerPageVariants;
    paginatePref: PaginatePref;
    constructor();
    private _previousPage;
    private _pageChanged;
    private _nextPage;
    private _onRowsPerPageChange;
    private _onSearchChange;
    private _propagateEvent;
    private _currentPageStart;
    private _currentPageEnd;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map