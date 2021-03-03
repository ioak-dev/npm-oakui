var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import OakAppLayoutEvent from '../../event/OakAppLayoutEvent';
import { globalStyles } from '../../_internal/styles/global-styles';
import { oakAppLayoutStyles } from './index-styles';
import { recomputeDimensionsLeft, recomputeDimensionsRight, recomputeTopbarSpacing, } from './service';
let elementIdCounter = 0;
/**
 * App layout component.
 *
 */
const customElementName = 'oak-app-layout';
let OakAppLayout = class OakAppLayout extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.topbarElementId = `${this.elementId}-topbar`;
        this.leftDrawerElementId = `${this.elementId}-drawer-left`;
        this.rightDrawerElementId = `${this.elementId}-drawer-right`;
        this.contentElementId = `${this.elementId}-content`;
        this.topbarVariant = 'auto';
        this.leftDrawerOpen = false;
        this.rightDrawerOpen = false;
        this.leftDrawerType = 'side';
        this.rightDrawerType = 'side';
        this.topbarColor = 'primary';
        this.topElevation = 10;
        this.leftElevation = 10;
        this.rightElevation = 10;
        this.propagateEvent = (eventType, event) => {
            this.dispatchEvent(new CustomEvent(eventType, {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.elementId,
                    name: event.name,
                    value: event.value,
                },
            }));
        };
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        setTimeout(() => this._recomputeDimensions());
    }
    shouldUpdate(_changedProperties) {
        _changedProperties.forEach((_, propName) => {
            if (propName === 'leftDrawerOpen' || propName === 'rightDrawerOpen') {
                this._recomputeDimensions();
            }
        });
        return true;
    }
    _recomputeDimensions() {
        try {
            if (this.shadowRoot) {
                const topbarEl = this.shadowRoot.getElementById(this.topbarElementId);
                const leftDrawerEl = this.shadowRoot.getElementById(this.leftDrawerElementId);
                const rightDrawerEl = this.shadowRoot.getElementById(this.rightDrawerElementId);
                const contentEl = this.shadowRoot.getElementById(this.contentElementId);
                recomputeDimensionsLeft(this.leftDrawerType, topbarEl, contentEl, leftDrawerEl, this.leftDrawerOpen, this.topbarVariant);
                recomputeDimensionsRight(this.rightDrawerType, topbarEl, contentEl, rightDrawerEl, this.rightDrawerOpen, this.topbarVariant);
                recomputeTopbarSpacing(topbarEl, contentEl, this.topbarVariant);
            }
        }
        catch (e) {
            console.log('**error', e);
        }
    }
    _handleClose() {
        if (this.leftDrawerOpen && ['over', 'push'].includes(this.leftDrawerType)) {
            this.propagateEvent(OakAppLayoutEvent.CLOSE_DRAWER, {
                name: 'left',
                value: true,
            });
        }
        if (this.rightDrawerOpen &&
            ['over', 'push'].includes(this.rightDrawerType)) {
            this.propagateEvent(OakAppLayoutEvent.CLOSE_DRAWER, {
                name: 'right',
                value: true,
            });
        }
    }
    _renderBackdrop() {
        if ((['push', 'over'].includes(this.leftDrawerType) && this.leftDrawerOpen) ||
            (['push', 'over'].includes(this.rightDrawerType) && this.rightDrawerOpen)) {
            return html `<div
        class="backdrop-fade"
        @click=${this._handleClose}
      ></div>`;
        }
        else {
            return html ``;
        }
    }
    getClassMap(baseClass) {
        switch (baseClass) {
            case 'base':
                return {
                    [customElementName]: true,
                };
            case 'drawer-left':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`${customElementName}__${baseClass}--top-layer`]: [
                        'push',
                        'over',
                    ].includes(this.leftDrawerType),
                    [`oak-bs-elevation${this.leftElevation}`]: this.leftDrawerOpen,
                };
            case 'drawer-right':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`${customElementName}__${baseClass}--top-layer`]: [
                        'push',
                        'over',
                    ].includes(this.rightDrawerType),
                    [`oak-bs-elevation${this.rightElevation}`]: this.rightDrawerOpen,
                };
            case 'topbar':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`${customElementName}__${baseClass}--${this.topbarVariant}`]: true,
                    [`oak-bs-elevation${this.topElevation}`]: true,
                    [`oak-color-bg-${this.topbarColor}`]: true,
                    [`oak-color-${this.topbarColor}-i`]: true,
                };
            case 'content':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            case 'content__topbar':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`oak-bs-elevation${this.topElevation}`]: true,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [...globalStyles, oakAppLayoutStyles];
    }
    render() {
        return html `<div
      class=${classMap(this.getClassMap('base'))}
      id=${this.elementId}
    >
      ${this._renderBackdrop()}
      <div
        class=${classMap(this.getClassMap('drawer-left'))}
        id=${this.leftDrawerElementId}
      >
        <slot name="drawer-left"></slot>
      </div>
      ${this.topbarVariant !== 'auto'
            ? html `<div
            class=${classMap(this.getClassMap('topbar'))}
            id=${this.topbarElementId}
          >
            <slot name="topbar"></slot>
          </div>`
            : html ``}
      <div
        class=${classMap(this.getClassMap('content'))}
        id=${this.contentElementId}
      >
        ${this.topbarVariant === 'auto'
            ? html ` <div class=${classMap(this.getClassMap('content__topbar'))}>
              <slot name="topbar"></slot>
            </div>`
            : html ``}
        <slot name="content"></slot>
      </div>
      <div
        class=${classMap(this.getClassMap('drawer-right'))}
        id=${this.rightDrawerElementId}
      >
        <slot name="drawer-right"></slot>
      </div>
    </div>`;
    }
};
__decorate([
    property({ type: String })
], OakAppLayout.prototype, "topbarVariant", void 0);
__decorate([
    property({ type: Boolean })
], OakAppLayout.prototype, "leftDrawerOpen", void 0);
__decorate([
    property({ type: Boolean })
], OakAppLayout.prototype, "rightDrawerOpen", void 0);
__decorate([
    property({ type: String })
], OakAppLayout.prototype, "leftDrawerType", void 0);
__decorate([
    property({ type: String })
], OakAppLayout.prototype, "rightDrawerType", void 0);
__decorate([
    property({ type: String })
], OakAppLayout.prototype, "topbarColor", void 0);
__decorate([
    property({ type: Number })
], OakAppLayout.prototype, "topElevation", void 0);
__decorate([
    property({ type: Number })
], OakAppLayout.prototype, "leftElevation", void 0);
__decorate([
    property({ type: Number })
], OakAppLayout.prototype, "rightElevation", void 0);
OakAppLayout = __decorate([
    customElement(customElementName)
], OakAppLayout);
export { OakAppLayout };
//# sourceMappingURL=index.js.map