import { LitElement } from 'lit-element';
import '../../../component/oak-paginate';
import '../../../component/oak-form';
import '../../../component/oak-input';
import '../../../component/oak-button';
import { TableHeader } from '../../../types/TableHeaderType';
export declare class OakInternalPaginateFilter extends LitElement {
    private elementId;
    header: TableHeader[];
    columnGrid: any;
    formElementFill?: 'container' | 'surface' | 'float' | 'none';
    formElementSize?: 'xsmall' | 'small' | 'medium' | 'large';
    formElementShape?: 'sharp' | 'rectangle' | 'rounded' | 'leaf';
    private _showColumnList;
    private _searchText;
    constructor();
    connectedCallback(): void;
    private _setShowColumnList;
    private _handleSearchTextChange;
    private _handleSearchTextReset;
    private _onSearch;
    private _propagateEvent;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map