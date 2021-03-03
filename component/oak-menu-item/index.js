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
import { oakMenuItemStyles } from './index-styles';
import { MENU_CLICK_EVENT } from '../../event/OakMenuEvent';
let elementIdCounter = 0;
const customElementName = 'oak-menu-item';
/**
 * Select drop down (native) form element.
 *
 */
let OakMenuItem = class OakMenuItem extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.fill = 'surface';
        this.name = '';
        this.handleClick = () => {
            this.propagateCustomEvent(MENU_CLICK_EVENT);
        };
        this.getClassMap = (baseClass) => {
            switch (baseClass) {
                case 'base':
                    return {
                        [`${customElementName}`]: true,
                        [`oak-fill-${this.fill}`]: true,
                        [`oak-fill-${this.fill}--hover-hc`]: true,
                    };
                default:
                    return {};
            }
        };
        this.propagateCustomEvent = (eventName) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.elementId,
                },
            }));
        };
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    static get styles() {
        return [...globalStyles, oakMenuItemStyles];
    }
    render() {
        return html `
      <button
        class=${classMap(this.getClassMap('base'))}
        @click=${this.handleClick}
        id=${this.elementId}
        type="button"
      >
        <slot></slot>
      </button>
    `;
    }
};
__decorate([
    property({ type: String })
], OakMenuItem.prototype, "fill", void 0);
__decorate([
    property({ type: String })
], OakMenuItem.prototype, "name", void 0);
OakMenuItem = __decorate([
    customElement(customElementName)
], OakMenuItem);
export { OakMenuItem };
//# sourceMappingURL=index.js.map