var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { globalStyles } from '../../_internal/styles/global-styles';
import { TABLE_PAGINATE_EVENT } from '../../types/TableEventTypes';
import { oakTableStyles } from './index-styles';
import '../oak-paginate';
let elementIdCounter = 0;
/**
 * Table component.
 *
 */
const customElementName = 'oak-table';
let OakTable = class OakTable extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.id = `${this.elementId}-id`;
        /**
         * Applicable when serverSidePagination = true
         */
        this.totalRows = 0;
        this.elevation = 1;
        this.rounded = false;
        this.variant = null;
        this.fill = 'surface';
        this.navPlacement = 'top';
        this.formElementSize = 'small';
        this.formElementShape = 'rectangle';
        this.dense = false;
        this.paginatePref = {
            pageNo: 1,
            rowsPerPage: 5,
            searchText: '',
        };
        this._onPageChange = (event) => {
            this._propagateEvent(TABLE_PAGINATE_EVENT, event.detail);
        };
        this._propagateEvent = (eventName, detail) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail,
            }));
        };
    }
    shouldUpdate(_changedProperties) {
        // _changedProperties.forEach((_, propName) => {
        //   if (propName === 'data') {
        //     this._paginate();
        //   }
        // });
        return true;
    }
    _renderPaginateSection() {
        return html `<div class=${classMap(this.getClassMap('paginate'))}>
      <oak-paginate
        @paginate-change=${this._onPageChange}
        .totalRows=${this.totalRows}
        .formElementSize=${this.formElementSize}
        .formElementShape=${this.formElementShape}
        .paginatePref=${this.paginatePref}
      >
      </oak-paginate>
    </div>`;
    }
    getClassMap(baseClass) {
        switch (baseClass) {
            case 'base':
                const data = {
                    [customElementName]: true,
                    [`oak-bs-elevation${this.elevation}`]: true,
                    'oak-rounded': this.rounded,
                    [`oak-fill-${this.fill}`]: true,
                };
                if (this.variant) {
                    data[`oak-${this.variant}`] = true;
                }
                return data;
            case 'paginate':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`${customElementName}__${baseClass}--dense`]: this.dense,
                };
            case 'datagrid':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`${customElementName}__${baseClass}--nav-${this.navPlacement}`]: true,
                    [`${customElementName}__${baseClass}--fill-${this.fill}`]: true,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [...globalStyles, oakTableStyles];
    }
    render() {
        return html `
      <div class=${classMap(this.getClassMap('base'))} id=${this.elementId}>
        ${this.navPlacement === 'top' ? this._renderPaginateSection() : html ``}
        <div class=${classMap(this.getClassMap('datagrid'))}>
          <slot></slot>
        </div>
        ${this.navPlacement === 'bottom'
            ? this._renderPaginateSection()
            : html ``}
      </div>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], OakTable.prototype, "id", void 0);
__decorate([
    property({ type: Number })
], OakTable.prototype, "totalRows", void 0);
__decorate([
    property({ type: Number })
], OakTable.prototype, "elevation", void 0);
__decorate([
    property({ type: Boolean })
], OakTable.prototype, "rounded", void 0);
__decorate([
    property({ type: String })
], OakTable.prototype, "variant", void 0);
__decorate([
    property({ type: String })
], OakTable.prototype, "fill", void 0);
__decorate([
    property({ type: String })
], OakTable.prototype, "navPlacement", void 0);
__decorate([
    property({ type: String })
], OakTable.prototype, "formElementSize", void 0);
__decorate([
    property({ type: String })
], OakTable.prototype, "formElementShape", void 0);
__decorate([
    property({ type: Boolean })
], OakTable.prototype, "dense", void 0);
__decorate([
    property({ type: Object })
], OakTable.prototype, "paginatePref", void 0);
OakTable = __decorate([
    customElement(customElementName)
], OakTable);
export { OakTable };
//# sourceMappingURL=index.js.map