var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { globalStyles } from '../../_internal/styles/global-styles';
import '../../_internal/component/oak-internal-popup';
import { oakMenuStyles } from './index-styles';
let elementIdCounter = 0;
const customElementName = 'oak-menu';
/**
 * Select drop down (native) form element.
 *
 */
let OakMenu = class OakMenu extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.inputElementId = `${this.elementId}-input`;
        this.liElementId = `${this.elementId}-popup-li`;
        this.ulElementId = `${this.elementId}-popup-ul`;
        this._isActivated = false;
        this._currentIndex = 0;
        this.options = [];
        this.size = 'small';
        this.shape = 'rectangle';
        this.fill = 'surface';
        /**
         * 	If true, the text will have a bottom margin.
         */
        this.gutterBottom = false;
        this.keydownEventHandler = (event) => {
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    this.navigateDown();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.navigateUp();
                    break;
                // case 'Enter':
                //   event.preventDefault();
                //   this.handleChange();
                //   break;
                // case 'Tab':
                //   event.preventDefault();
                //   this._deactivate();
                //   break;
                default:
                    break;
            }
        };
        this.navigateUp = () => {
            var _a;
            if (this._currentIndex > 0) {
                const elRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(`${this.liElementId}-${this._currentIndex - 1}`);
                if (elRef && !this.isScrolledIntoView(elRef)) {
                    elRef.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'start',
                    });
                }
                this._currentIndex = this._currentIndex - 1;
            }
            else {
                this._currentIndex = 0;
            }
        };
        this.isScrolledIntoView = (el, invertDirection = false) => {
            var _a;
            const rect = el.getBoundingClientRect();
            const elemTop = rect.top;
            const elemBottom = rect.bottom;
            const containerEl = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.ulElementId);
            if (!containerEl) {
                return true;
            }
            // Only completely visible elements return true:
            let isVisible = true;
            if (invertDirection) {
                isVisible =
                    elemTop >= 0 &&
                        elemBottom <=
                            containerEl.getBoundingClientRect().height +
                                containerEl.getBoundingClientRect().top;
            }
            else {
                isVisible =
                    elemTop >= 0 &&
                        elemTop >=
                            containerEl.getBoundingClientRect().height +
                                containerEl.getBoundingClientRect().top;
            }
            // Partially visible elements return true:
            //isVisible = elemTop < containerEl.getBoundingClientRect().height && elemBottom >= 0;
            return isVisible;
        };
        this._activate = () => {
            var _a;
            console.log('** _activate');
            this._isActivated = true;
            this._currentIndex = 0;
            const docRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.elementId);
            if (docRef) {
                docRef.addEventListener('keydown', this.keydownEventHandler);
            }
            setTimeout(() => {
                var _a;
                const inputElRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.inputElementId);
                if (inputElRef) {
                    inputElRef.focus();
                }
            }, 201);
        };
        this._deactivate = () => {
            var _a;
            this._isActivated = false;
            const docRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.elementId);
            if (docRef) {
                docRef.removeEventListener('keydown', this.keydownEventHandler);
            }
        };
        this.handleKeydown = (event) => {
            if (this._isActivated) {
                this.keydownEventHandler(event.detail.value);
            }
        };
        this.handleClick = () => {
            this._isActivated ? this._deactivate() : this._activate();
        };
        this.handleMenuClick = () => {
            console.log('**handle menu click');
            this._deactivate();
        };
        this.getClassMap = (baseClass) => {
            switch (baseClass) {
                case 'base':
                    return {
                        [`${customElementName}__${baseClass}`]: true,
                    };
                case 'popup':
                    return {
                        [`${customElementName}__${baseClass}`]: true,
                    };
                case 'ul':
                    return {
                        [`${customElementName}__${baseClass}`]: true,
                    };
                default:
                    return {};
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    navigateDown() {
        var _a;
        if (this._currentIndex < this.options.length - 1) {
            const elRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(`${this.liElementId}-${this._currentIndex + 1}`);
            if (elRef && !this.isScrolledIntoView(elRef, true)) {
                elRef.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start',
                });
            }
            this._currentIndex = this._currentIndex + 1;
        }
        else {
            this._currentIndex = 0;
        }
    }
    static get styles() {
        return [...globalStyles, oakMenuStyles];
    }
    render() {
        return html `
      <oak-internal-popup
        @popup-activate=${this._activate}
        @popup-deactivate=${this._deactivate}
        @popup-key-pressed=${this.handleKeydown}
        ?isActivated=${this._isActivated}
        .size=${this.size}
        .shape=${this.shape}
        .fill=${this.fill}
        type="custom"
      >
        <div slot="action">
          <slot
            name="menu-trigger"
            @button-click=${this.handleClick}
            @link-click=${this.handleClick}
            @click=${this.handleClick}
          ></slot>
        </div>
        <div
          slot="popup"
          class=${classMap(this.getClassMap('popup'))}
          id=${this.elementId}
        >
          <slot name="menu-popup" @menu-click=${this.handleMenuClick}></slot>
        </div>
      </oak-internal-popup>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], OakMenu.prototype, "_isActivated", void 0);
__decorate([
    property({ type: Number })
], OakMenu.prototype, "_currentIndex", void 0);
__decorate([
    property({ type: Array })
], OakMenu.prototype, "options", void 0);
__decorate([
    property({ type: String })
], OakMenu.prototype, "size", void 0);
__decorate([
    property({ type: String })
], OakMenu.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], OakMenu.prototype, "fill", void 0);
__decorate([
    property({ type: Boolean })
], OakMenu.prototype, "gutterBottom", void 0);
OakMenu = __decorate([
    customElement(customElementName)
], OakMenu);
export { OakMenu };
//# sourceMappingURL=index.js.map