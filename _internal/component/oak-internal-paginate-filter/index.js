var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { globalStyles } from '../../styles/global-styles';
import { oakInternalPaginateFilterStyles } from './index-styles';
import '../../../component/oak-paginate';
import '../../../component/oak-form';
import '../../../component/oak-input';
import '../../../component/oak-button';
import { PAGINATE_SEARCH_EVENT } from '../../../event/OakPaginateEvent';
let elementIdCounter = 0;
/**
 * oak-internal-table-paginate.
 *
 */
const customElementName = 'oak-internal-paginate-filter';
let OakInternalPaginateFilter = class OakInternalPaginateFilter extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.header = [];
        this.formElementFill = 'surface';
        this.formElementSize = 'small';
        this.formElementShape = 'rectangle';
        this._showColumnList = false;
        this._searchText = '';
        this._onSearch = () => {
            this._propagateEvent(PAGINATE_SEARCH_EVENT, {
                searchText: this._searchText,
            });
        };
        this._propagateEvent = (eventName, detail) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail,
            }));
        };
    }
    connectedCallback() {
        super.connectedCallback();
    }
    _setShowColumnList(val) {
        this._showColumnList = val;
    }
    _handleSearchTextChange(event) {
        this._searchText = event.detail.value;
    }
    _handleSearchTextReset() {
        this._searchText = '';
        this._onSearch();
    }
    getClassMap(baseClass) {
        switch (baseClass) {
            case 'base':
                return {
                    [customElementName]: true,
                };
            case 'filter-container':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            case 'search-form':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [...globalStyles, oakInternalPaginateFilterStyles];
    }
    render() {
        return html `
      <oak-modal
        .showModal=${this._showColumnList}
        @close-modal=${() => this._setShowColumnList(false)}
        heading="Choose columns"
      >
        <div slot="body">body</div>
        <div slot="footer">
          footer
        </div>
      </oak-modal>
      <div class=${classMap(this.getClassMap('filter-container'))}>
        <oak-button
          @button-click=${() => this._setShowColumnList(true)}
          theme="default"
          variant="appear"
          shape="icon"
          .size=${this.formElementSize}
        >
          filter
        </oak-button>
        <oak-form
          formGroupName=${`${this.elementId}-search-form`}
          @form-submit=${this._onSearch}
        >
          <div class=${classMap(this.getClassMap('search-form'))}>
            <oak-input
              .value=${this._searchText}
              name="_searchText"
              @input-input=${this._handleSearchTextChange}
              placeholder="Search"
              .size=${this.formElementSize}
              .shape=${this.formElementShape}
              .fill=${this.formElementFill}
              formGroupName=${`${this.elementId}-search-form`}
            ></oak-input>
            <oak-button
              theme=${this._searchText ? 'primary' : 'default'}
              variant="appear"
              shape="icon"
              .size=${this.formElementSize}
              type="submit"
              formGroupName=${`${this.elementId}-search-form`}
            >
              search
            </oak-button>
            <oak-button
              theme="default"
              variant=${this._searchText ? 'appear' : 'disabled'}
              @button-click=${this._handleSearchTextReset}
              shape="icon"
              .size=${this.formElementSize}
            >
              close
            </oak-button>
          </div>
        </oak-form>
      </div>
    `;
    }
};
__decorate([
    property({ type: Array })
], OakInternalPaginateFilter.prototype, "header", void 0);
__decorate([
    property({ type: Object })
], OakInternalPaginateFilter.prototype, "columnGrid", void 0);
__decorate([
    property({ type: String })
], OakInternalPaginateFilter.prototype, "formElementFill", void 0);
__decorate([
    property({ type: String })
], OakInternalPaginateFilter.prototype, "formElementSize", void 0);
__decorate([
    property({ type: String })
], OakInternalPaginateFilter.prototype, "formElementShape", void 0);
__decorate([
    property({ type: String })
], OakInternalPaginateFilter.prototype, "_showColumnList", void 0);
__decorate([
    property({ type: String })
], OakInternalPaginateFilter.prototype, "_searchText", void 0);
OakInternalPaginateFilter = __decorate([
    customElement(customElementName)
], OakInternalPaginateFilter);
export { OakInternalPaginateFilter };
//# sourceMappingURL=index.js.map