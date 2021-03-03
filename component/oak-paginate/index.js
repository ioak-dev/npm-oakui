var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { globalStyles } from '../../_internal/styles/global-styles';
import { PAGINATE_CHANGE_EVENT } from '../../event/OakPaginateEvent';
import { oakPaginateStyles } from './index-styles';
import '../oak-select';
import '../../_internal/component/oak-internal-paginate-filter';
let elementIdCounter = 0;
/**
 * Table component.
 *
 */
const customElementName = 'oak-paginate';
let OakPaginate = class OakPaginate extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.totalRows = 0;
        this.label = 'Rows per page';
        this.formElementSize = 'small';
        this.formElementShape = 'rectangle';
        this.formElementFill = 'surface';
        this._rowsPerPageVariants = [5, 10, 20, 50];
        this.paginatePref = {
            pageNo: 1,
            rowsPerPage: 5,
            searchText: '',
        };
        this._previousPage = () => {
            if (this.paginatePref.pageNo !== 1) {
                this._pageChanged(Object.assign(Object.assign({}, this.paginatePref), { pageNo: this.paginatePref.pageNo - 1 }));
            }
        };
        this._pageChanged = (_paginatePref) => {
            this._propagateEvent(PAGINATE_CHANGE_EVENT, _paginatePref);
        };
        this._nextPage = () => {
            if (Math.ceil(this.totalRows / this.paginatePref.rowsPerPage) !==
                this.paginatePref.pageNo) {
                this._pageChanged(Object.assign(Object.assign({}, this.paginatePref), { pageNo: this.paginatePref.pageNo + 1 }));
            }
        };
        this._onRowsPerPageChange = (event) => {
            const firstItemNoInCurrentView = (this.paginatePref.pageNo - 1) * this.paginatePref.rowsPerPage + 1;
            this._pageChanged(Object.assign(Object.assign({}, this.paginatePref), { rowsPerPage: event.detail.value, pageNo: Math.ceil(firstItemNoInCurrentView / event.detail.value) }));
        };
        this._onSearchChange = (event) => {
            this._pageChanged(Object.assign(Object.assign({}, this.paginatePref), { pageNo: 1, searchText: event.detail.searchText }));
        };
        this._propagateEvent = (eventName, detail) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail,
            }));
        };
        this._currentPageStart = () => {
            return (this.paginatePref.pageNo - 1) * this.paginatePref.rowsPerPage + 1;
        };
        this._currentPageEnd = () => {
            return this.paginatePref.pageNo * this.paginatePref.rowsPerPage <
                this.totalRows
                ? this.paginatePref.pageNo * this.paginatePref.rowsPerPage
                : this.totalRows;
        };
    }
    getClassMap(baseClass) {
        switch (baseClass) {
            case 'base':
                const data = {
                    [customElementName]: true,
                };
                return data;
            case 'left':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            case 'right':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            case 'page-number':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            case 'page-nav':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [...globalStyles, oakPaginateStyles];
    }
    render() {
        return html `
      <div class=${classMap(this.getClassMap('base'))} id=${this.elementId}>
        <div class=${classMap(this.getClassMap('left'))}>
          <oak-internal-paginate-filter
            .formElementFill=${this.formElementFill}
            .formElementSize=${this.formElementSize}
            .formElementShape=${this.formElementShape}
            @paginate-search=${this._onSearchChange}
          ></oak-internal-paginate-filter>
        </div>
        <div class=${classMap(this.getClassMap('right'))}>
          <div>${this.label}</div>
          <div>
            <oak-select
              .value=${this.paginatePref.rowsPerPage}
              name="rowsPerPage"
              @input-change=${this._onRowsPerPageChange}
              .options=${this._rowsPerPageVariants}
              .fill=${this.formElementFill}
              .size=${this.formElementSize}
              .shape=${this.formElementShape}
            ></oak-select>
          </div>
          <div class=${classMap(this.getClassMap('page-number'))}>
            <div>
              ${`${this._currentPageStart()}-${this._currentPageEnd()} of ${this.totalRows}`}
            </div>
          </div>
          <div class=${classMap(this.getClassMap('page-nav'))}>
            <div>
              <oak-button
                @button-click=${this._previousPage}
                theme="info"
                variant="block"
                shape="icon"
                .size=${this.formElementSize}
                semitransparent
              >
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style="width: 24; height: 24;"
                >
                  <path
                    d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
                  ></path>
                </svg>
              </oak-button>
            </div>
            <div>
              <oak-button
                @button-click=${this._nextPage}
                theme="info"
                variant="block"
                shape="icon"
                .size=${this.formElementSize}
                semitransparent
              >
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style="width: 24; height: 24;"
                >
                  <path
                    d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
                  ></path>
                </svg>
              </oak-button>
            </div>
          </div>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], OakPaginate.prototype, "totalRows", void 0);
__decorate([
    property({ type: String })
], OakPaginate.prototype, "label", void 0);
__decorate([
    property({ type: String })
], OakPaginate.prototype, "formElementSize", void 0);
__decorate([
    property({ type: String })
], OakPaginate.prototype, "formElementShape", void 0);
__decorate([
    property({ type: String })
], OakPaginate.prototype, "formElementFill", void 0);
__decorate([
    property({ type: Array })
], OakPaginate.prototype, "_rowsPerPageVariants", void 0);
__decorate([
    property({ type: Object })
], OakPaginate.prototype, "paginatePref", void 0);
OakPaginate = __decorate([
    customElement(customElementName)
], OakPaginate);
export { OakPaginate };
//# sourceMappingURL=index.js.map