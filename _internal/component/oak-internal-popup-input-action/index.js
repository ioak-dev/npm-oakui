var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { globalStyles } from '../../styles/global-styles';
import '../oak-internal-label';
import '../oak-internal-form-tooltip';
import '../oak-internal-form-error';
import '../../../component/oak-button';
import '../../../component/oak-input';
import { oakInternalPopupInputActionStyles } from './index-styles';
import { oakInternalPopupInputActionSizeStyles } from './size-styles';
let elementIdCounter = 0;
const customElementName = 'oak-internal-popup-input-action';
/**
 * Select drop down (native) form element.
 *
 */
let OakInternalPopupInputAction = class OakInternalPopupInputAction extends LitElement {
    /**
     * Validators
     *
     */
    /**
     * @private
     */
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.placeholder = '';
        this.tooltip = '';
        this.name = this.elementId;
        this.disabled = false;
        this.options = [];
        this.errors = [];
        this.scrollableContainers = [];
        this.size = 'small';
        this.shape = 'rectangle';
        this.fill = 'surface';
        this.getClassMap = (baseClass) => {
            switch (baseClass) {
                case 'base':
                    return {
                        [customElementName]: true,
                        [`${customElementName}--size-${this.size}`]: true,
                        [`oak-shape-${this.shape}`]: true,
                        [`oak-fill-${this.fill}`]: true,
                        [`oak-fill-${this.fill}--hover`]: true,
                    };
                case 'value':
                case 'placeholder':
                case 'down-arrow':
                    return {
                        [`${customElementName}--${baseClass}`]: true,
                    };
                default:
                    return {};
            }
        };
        this.handleInputFocused = () => {
            this.propagateCustomEvent('toggle');
        };
        this.propagateCustomEvent = (eventName, value) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.elementId,
                    name: this.name,
                    value: value || null,
                },
            }));
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this._registerEvents();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._unregisterEvents();
    }
    _registerEvents() {
        //
    }
    _unregisterEvents() {
        // window.removeEventListener('resize', this.adjustPositioning);
        // window.removeEventListener('scroll', this.adjustPositioning);
    }
    static get styles() {
        return [
            ...globalStyles,
            oakInternalPopupInputActionStyles,
            oakInternalPopupInputActionSizeStyles,
        ];
    }
    render() {
        return html `
      <button
        class=${classMap(this.getClassMap('base'))}
        @click=${this.handleInputFocused}
        id=${this.elementId}
        type="button"
      >
        ${this.value
            ? html `<div class=${classMap(this.getClassMap('value'))}>
              ${this.value}
            </div>`
            : html `<div class=${classMap(this.getClassMap('placeholder'))}>
              ${this.placeholder}
            </div>`}
        <div class=${classMap(this.getClassMap('down-arrow'))}>
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          </svg>
        </div>
      </button>
    `;
    }
};
__decorate([
    property()
], OakInternalPopupInputAction.prototype, "value", void 0);
__decorate([
    property({ type: String })
], OakInternalPopupInputAction.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], OakInternalPopupInputAction.prototype, "tooltip", void 0);
__decorate([
    property({ type: String })
], OakInternalPopupInputAction.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalPopupInputAction.prototype, "disabled", void 0);
__decorate([
    property({ type: Array })
], OakInternalPopupInputAction.prototype, "options", void 0);
__decorate([
    property({ type: Array })
], OakInternalPopupInputAction.prototype, "optionsAsKeyValue", void 0);
__decorate([
    property({ type: Array })
], OakInternalPopupInputAction.prototype, "errors", void 0);
__decorate([
    property({ type: Array })
], OakInternalPopupInputAction.prototype, "scrollableContainers", void 0);
__decorate([
    property({ type: String })
], OakInternalPopupInputAction.prototype, "size", void 0);
__decorate([
    property({ type: String })
], OakInternalPopupInputAction.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], OakInternalPopupInputAction.prototype, "fill", void 0);
OakInternalPopupInputAction = __decorate([
    customElement(customElementName)
], OakInternalPopupInputAction);
export { OakInternalPopupInputAction };
//# sourceMappingURL=index.js.map