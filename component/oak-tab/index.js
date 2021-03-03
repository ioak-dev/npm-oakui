var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { containerScrolledSubject } from '../../_internal/events/ContainerScrolledEvent';
import { globalStyles } from '../../_internal/styles/global-styles';
import { compose } from '../../style-composer/OakMenuComposer';
import { TAB_CHANGE_EVENT } from '../../event/OakTabEvent';
import '../oak-menu';
import '../oak-menu-item';
import { oakTabAnimationStyles } from './animation-styles';
import { oakTabBaseStyles } from './base-styles';
import { oakTabVariantAccentStyles } from './variant-accent-styles';
import { oakTabVariantFillStyles } from './variant-fill-styles';
import { oakTabVariantTextStyles } from './variant-text-styles';
import { oakTabVariantUnderlineStyles } from './variant-underline-styles';
import { oakTabVariantPillsStyles } from './variant-pills-styles';
let elementIdCounter = 0;
/**
 * Tab component.
 *
 */
const customElementName = 'oak-tab';
let OakTab = class OakTab extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.headerElementId = `${this.elementId}-header`;
        this.overflowMenuElementId = `${this.elementId}-overflow-menu`;
        this.tabs = [];
        this.activeTabIndex = 0;
        this.color = 'primary';
        this.variant = 'underline';
        this.rounded = false;
        this.fill = false;
        this.nobaseline = false;
        this._hiddenTabIndexes = [];
        this._debounceTimeout = false;
        this.handleClick = (tabIndex) => {
            this.propagateEvent(TAB_CHANGE_EVENT, tabIndex);
        };
        this.propagateEvent = (eventName, value) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.elementId,
                    name: 'slot',
                    value,
                },
            }));
        };
    }
    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => this._adjustPositioning());
        this._registerEvents();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._unregisterEvents();
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
    }
    _registerEvents() {
        containerScrolledSubject.asObservable().subscribe(() => {
            clearTimeout(this._debounceTimeout);
            this._debounceTimeout = setTimeout(() => this._adjustPositioning(), 100);
        });
        fromEvent(window, 'resize')
            .pipe(map((event) => event))
            .subscribe(() => {
            clearTimeout(this._debounceTimeout);
            this._debounceTimeout = setTimeout(() => this._adjustPositioning(), 100);
        });
    }
    _unregisterEvents() {
        // window.removeEventListener('resize', this.adjustPositioning);
        // window.removeEventListener('scroll', this.adjustPositioning);
    }
    _adjustPositioning() {
        const _hiddenTabIndexesComputed = [];
        this._hiddenTabIndexes = [..._hiddenTabIndexesComputed];
        setTimeout(() => this._doAdjustPositioning());
    }
    _doAdjustPositioning() {
        try {
            if (this.shadowRoot) {
                const tabElList = this.shadowRoot.querySelectorAll(`.${customElementName}-${this.variant}__tab`);
                const headerEl = this.shadowRoot.getElementById(this.headerElementId);
                const overflowMenuEl = this.shadowRoot.getElementById(this.overflowMenuElementId);
                const _hiddenTabIndexesComputed = [];
                if (tabElList && headerEl && overflowMenuEl) {
                    let stopWidth = overflowMenuEl.clientWidth;
                    for (let i = 0; i < tabElList.length; ++i) {
                        stopWidth += tabElList[i].scrollWidth;
                        if (stopWidth > headerEl.clientWidth) {
                            _hiddenTabIndexesComputed.push(i);
                        }
                    }
                    this._hiddenTabIndexes = [..._hiddenTabIndexesComputed];
                }
            }
        }
        catch (e) {
            console.log('**error', e);
        }
    }
    _renderTab(tabIndex) {
        return html `<li class=${classMap(this.getClassMap('tab', tabIndex))}>
      <button
        class=${classMap(this.getClassMap('button', tabIndex))}
        @click=${() => this.handleClick(tabIndex)}
        id=${this.elementId}
        type="button"
      >
        <slot .name=${tabIndex.toString()}></slot>${this.tabs[tabIndex]}
      </button>
    </li>`;
    }
    _renderOverflowMenu() {
        return html `<li
      class=${classMap(this.getClassMap('overflow-menu'))}
      id=${this.overflowMenuElementId}
    >
      <oak-menu>
        <button
          class=${classMap(this.getClassMap('overflow-menu__trigger'))}
          type="button"
          slot="menu-trigger"
        >
          More ...
        </button>
        <div class=${compose({})} slot="menu-popup">
          ${this._hiddenTabIndexes.map((tabIndex) => html `<oak-menu-item
                @menu-click=${() => this.handleClick(tabIndex)}
                >${this.tabs[tabIndex]}</oak-menu-item
              >`)}
        </div>
      </oak-menu>
    </li>`;
    }
    getClassMap(baseClass, tabIndex = 0) {
        const _baseClass = `${customElementName}-${this.variant}`;
        switch (baseClass) {
            case 'base':
                const data = {
                    [_baseClass]: true,
                    [`${_baseClass}--color-${this.color}`]: true,
                    [`${_baseClass}--variant-${this.variant}`]: true,
                };
                return data;
            case 'header':
                return {
                    [`${_baseClass}__${baseClass}`]: true,
                    [`${_baseClass}__${baseClass}--${this.nobaseline ? 'nobaseline' : 'baseline'}`]: true,
                };
            case 'tab':
                return {
                    [`${_baseClass}__${baseClass}`]: true,
                    [`${_baseClass}__${baseClass}--${this.elementId}`]: true,
                    [`${_baseClass}__${baseClass}--hidden`]: this._hiddenTabIndexes.includes(tabIndex),
                };
            case 'button':
            case 'overflow-menu__trigger':
                const localClass = 'button';
                return {
                    [`${_baseClass}__${localClass}`]: true,
                    [`${_baseClass}__${localClass}--rounded`]: this.rounded,
                    [`${_baseClass}__${localClass}--fill`]: this.fill,
                    [`${_baseClass}__${localClass}--active`]: baseClass === 'button'
                        ? tabIndex === this.activeTabIndex
                        : this._hiddenTabIndexes.includes(this.activeTabIndex),
                    [`${_baseClass}__${localClass}--color-${this.color}`]: true,
                    [`${_baseClass}__${localClass}--variant-${this.variant}`]: true,
                };
            case 'overflow-menu':
                return {
                    [`${_baseClass}__${baseClass}`]: true,
                    [`${_baseClass}__${baseClass}--hidden`]: this._hiddenTabIndexes.length === 0,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [
            ...globalStyles,
            oakTabBaseStyles,
            oakTabVariantUnderlineStyles,
            oakTabVariantAccentStyles,
            oakTabVariantFillStyles,
            oakTabVariantTextStyles,
            oakTabVariantPillsStyles,
            oakTabAnimationStyles,
        ];
    }
    render() {
        return html `
      <div class=${classMap(this.getClassMap('base'))} id=${this.elementId}>
        <ul
          class=${classMap(this.getClassMap('header'))}
          id=${this.headerElementId}
        >
          ${this.tabs.map((_, tabIndex) => this._renderTab(tabIndex))}
          ${this._renderOverflowMenu()}
        </ul>
        <slot name="content"></slot>
      </div>
    `;
    }
};
__decorate([
    property({ type: Array })
], OakTab.prototype, "tabs", void 0);
__decorate([
    property({ type: Number })
], OakTab.prototype, "activeTabIndex", void 0);
__decorate([
    property({ type: String })
], OakTab.prototype, "color", void 0);
__decorate([
    property({ type: String })
], OakTab.prototype, "variant", void 0);
__decorate([
    property({ type: Boolean })
], OakTab.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean })
], OakTab.prototype, "fill", void 0);
__decorate([
    property({ type: Boolean })
], OakTab.prototype, "nobaseline", void 0);
__decorate([
    property({ type: Array })
], OakTab.prototype, "_hiddenTabIndexes", void 0);
OakTab = __decorate([
    customElement(customElementName)
], OakTab);
export { OakTab };
//# sourceMappingURL=index.js.map